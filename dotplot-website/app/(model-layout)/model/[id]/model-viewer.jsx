"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ScanDetails from "./scan-details";
import PatientDetails from "./patient-details";
import { min } from "three/examples/jsm/nodes/Nodes.js";

function ModelViewer({ params }) {
  const { id } = params;
  const scene = useRef(new THREE.Scene());
  const mountRef = useRef(null);
  const [clickedScanId, setClickedVertex] = useState(null);

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  useEffect(() => {
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    console.log(window.innerWidth);
    camera.position.set(0, 0, 5); // Set initial camera position
    scene.current.background = new THREE.Color(0x120032);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 3);
    light1.position.set(5, 5, 5);
    scene.current.add(light1);

    const light3 = new THREE.DirectionalLight(0xffffff, 3);
    light3.position.set(5, 5, -5);
    scene.current.add(light3);

    const light4 = new THREE.DirectionalLight(0xffffff, 3);
    light4.position.set(-5, 5, 5);
    scene.current.add(light4);

    const light2 = new THREE.AmbientLight(0xffffff, 1);
    light2.position.set(-1, -1, -1);
    scene.current.add(light2);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load(
      `http://127.0.0.1:5000/api/us-scan/model3D/${id}`,
      (gltf) => {
        // Add new model

        // // Add new model
        // gltf.scene.traverse((child) => {
        //   if (child.isMesh) {
        //     child.geometry.computeBoundingBox();
        //     child.geometry.computeBoundingSphere();
        //     scene.add(child);
        //   }
        // });
        // Remove existing objects from the scene if necessary
        // (uncomment if objects should not be duplicated)
        // scene.current.clear();

        // Add model to the scene
        // gltf.scene.traverse((child) => {
        // scene.current.add(child);
        // if (child.isMesh) {
        // console.log("Loaded Mesh:", child);
        // scene.current.add(child);
        // if (mesh) {
        //   scene.current.remove(mesh);
        // }
        // mesh = child;

        // child.geometry.computeBoundingBox(); // Ensure bounding box is computed
        // child.geometry.computeBoundingSphere(); // Ensure bounding sphere is computed
        // Optionally set raycast precision or other settings if needed
        // }
        // scene.current.remove(lastChild);
        // });
        // const lastChild =
        //   scene.current.children[scene.current.children.length - 2];
        // scene.current.remove(lastChild);
        scene.current.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(1, 1, 1);
      },
      undefined,
      (error) => {
        console.error("An error happened", error);
      }
    );

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.zoomSpeed = 1.2;
    controls.maxDistance = 0.8; // Adjusted max distance
    controls.minDistance = 0.1; // Adjusted min distance
    controls.enablePan = true; // Enable panning
    controls.maxAzimuthAngle = Infinity; // Allow full 360 rotation
    controls.minAzimuthAngle = -Infinity;

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Handle mouse click
    const handleClick = (event) => {
      // Calculate mouse position in normalized device coordinates
      const NAVBAR_HEIGHT = 0.1774;
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y =
        -(event.clientY / window.innerHeight) * 2 + 1 + NAVBAR_HEIGHT;
      // console.log(-(event.clientY / window.innerHeight) * 2 + 1);
      console.log(mouse.current.y);
      // Update the raycaster
      // let lastChild = scene.current.children[scene.current.children.length - 1];

      // lastChild.updateMatrixWorld();
      // let lastChild2 =
      //   scene.current.children[scene.current.children.length - 2];

      // lastChild2.updateMatrixWorld();
      // console.log(lastChild);
      raycaster.current.setFromCamera(mouse.current, camera);

      // Check for intersections with the mesh
      const intersects = raycaster.current.intersectObjects(
        scene.current.children,
        true
      );
      // console.log(scene);

      if (intersects.length > 0) {
        let clickedId = null;
        const intersected = intersects[0];
        const vertexLabels = intersected.object.userData.vertex_labels || {};
        // console.log(vertexLabels);

        let count = 0;
        let distance = Infinity;
        let minDistance = Infinity;
        while (vertexLabels[count]) {
          const target_coords = Object.keys(vertexLabels[count])[0].split(",");
          const norm_y = 4 - (intersected.point.y + 0.008) * 40;
          const norm_x = (intersected.point.x + 0.157) * 29 - 1;
          const THRESHOLD = 2;
          distance =
            Math.abs(norm_x - Number(target_coords[1])) +
            Math.abs(norm_y - Number(target_coords[0]));
          if (
            Math.abs(norm_x - Number(target_coords[1])) < THRESHOLD &&
            Math.abs(norm_y - Number(target_coords[0])) < THRESHOLD &&
            distance < minDistance
          ) {
            minDistance = distance;
            clickedId = Object.values(vertexLabels[count])[0];
            setClickedVertex(clickedId);
          }
          count++;
        }
        if (!clickedId) {
          setClickedVertex(null);
        }
      }
    };

    window.addEventListener("click", handleClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene.current, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);

      // Cleanup renderer and controls
      renderer.dispose();
      controls.dispose();

      // Cleanup DOM element
      // mountRef.current.removeChild(renderer.domElement);
    };
  }, [id]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <PatientDetails patient_id={id} />
      {clickedScanId && <ScanDetails scan_id={clickedScanId} />}
      {!clickedScanId && (
        <div className="absolute top-10 left-10 bg-black bg-opacity-80 text-white p-4 rounded-lg shadow-lg">
          Please click on a tumour for more information
        </div>
      )}
    </div>
  );
}

export default ModelViewer;

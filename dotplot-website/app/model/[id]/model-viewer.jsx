"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ScanDetails from "./scan-details";
import PatientDetails from "./patient-details";

function ModelViewer({ params }) {
  const { id } = params;
  const scene = new THREE.Scene();
  const mountRef = useRef(null);
  const [clickedScanId, setClickedVertex] = useState(null);

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  useEffect(() => {
    // Create scene

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.set(0, 0, 5); // Set initial camera position

    // Create renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 3);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light3 = new THREE.DirectionalLight(0xffffff, 3);
    light3.position.set(5, 5, -5);
    scene.add(light3);

    const light4 = new THREE.DirectionalLight(0xffffff, 3);
    light4.position.set(-5, 5, 5);
    scene.add(light4);

    const light2 = new THREE.AmbientLight(0xffffff, 1);
    light2.position.set(-1, -1, -1);
    scene.add(light2);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load(`http://127.0.0.1:5000/api/us-scan/model3D/${id}`, (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.scale.set(1, 1, 1);
    });

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.zoomSpeed = 1.2;
    controls.maxDistance = 0.9;
    controls.minDistance = 0.1;
    controls.enablePan = false;
    controls.maxAzimuthAngle = Math.PI / 2;
    controls.minAzimuthAngle = -Math.PI / 2;
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
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the raycaster
      raycaster.current.setFromCamera(mouse.current, camera);

      // Check for intersections with the mesh
      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      if (intersects.length > 0) {
        let clickedId = null;
        const intersected = intersects[0];
        const vertexLabels = intersected.object.userData.vertex_labels || {};
        let count = 0;
        while (vertexLabels[count]) {
          const target_coords = Object.keys(vertexLabels[count])[0].split(",");
          const norm_y = 4 - (intersected.point.y + 0.008) * 40;
          const norm_x = (intersected.point.x + 0.157) * 29 - 1;
          if (
            Math.abs(norm_x - Number(target_coords[1])) < 1 &&
            Math.abs(norm_y - Number(target_coords[0])) < 1
          ) {
            clickedId = Object.values(vertexLabels[count])[0];
            setClickedVertex(clickedId);
          }
          count++;
        }
        if (!clickedId) {
          setClickedVertex(null);
        }
        console.log(setClickedVertex);

        // console.log(norm_x);
        // console.log(Math.abs(norm_y - Number(target_coords[0])) < 1);
        // console.log(Math.abs(norm_x - Number(target_coords[1])) < 1);

        // const geometry = intersected.object.geometry;
        // const positionAttribute = geometry.attributes.position;

        // // Find closest vertex
        // let closestVertexIndex = -1;
        // let minDistance = Infinity;

        // const point = new THREE.Vector3();
        // for (let i = 0; i < positionAttribute.count; i++) {
        //   point.fromBufferAttribute(positionAttribute, i);
        //   const distance = point.distanceTo(intersected.point);
        //   if (distance < minDistance) {
        //     closestVertexIndex = i;
        //     minDistance = distance;
        //   }
        // }

        // // Retrieve label from embedded metadata
        // const vertexLabels = intersected.object.userData.vertex_labels || {};
        // if (vertexLabels[closestVertexIndex]) {
        //   const label = vertexLabels[closestVertexIndex].label;
        //   // console.log("clicked");
        //   setClickedVertex(label);
        // } else {
        //   // console.log("missed");
        //   setClickedVertex(null);
        // }
      }
    };

    window.addEventListener("click", handleClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
      // mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

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

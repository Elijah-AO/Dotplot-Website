import numpy as np
import pywavefront
import trimesh
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.collections import PathCollection
# from ..database.models import Patient,US_scan


#             a     b     c     d     e     f     g     h
index_list=[[3405, 3415, 3446, 3502, 1472, 1384, 1408, 1354],
            [3376, 3662, 3389, 3421, 1467, 1338, 1620, 1251],
            [3371, 3291, 3356, 3430, 1484, 1358, 1308, 1340],
            [3378, 3402, 3455, 3516, 1556, 1425, 1372, 1348]]
RED = [1.,0.,0.]
GREEN = [0.,1.,0.]
PURPLE = [1.,0.,0.5]
BLUE = [0.,0.,1.]
LIGHT_BLUE = [.1,.7,1.]
YELLOW = [1.,1.,0.]
ORANGE = [1.,0.5,0.]
# try: 3200-3600 & 1100 to 1600
# Load the model using pywavefront
# Function to calculate smooth vertex normals
def calculate_vertex_normals(vertices, faces):
    normals = np.zeros_like(vertices)
    for face in faces:
        v1, v2, v3 = vertices[face]
        face_normal = np.cross(v2 - v1, v3 - v1)
        face_normal /= np.linalg.norm(face_normal)
        for idx in face:
            normals[idx] += face_normal
    norms = np.linalg.norm(normals, axis=1)
    norms[norms == 0] = 1
    normals /= norms[:, np.newaxis]
    return normals

# Function to calculate vertex colors based on a gradient
def calculate_gradient_colors(vertices, colors,target_index,color_stops,scan_id,vertex_labels):
    
    target = vertices[target_index]
    print(target)
    thresholds = np.array([1.0,0.8, 0.5])  # Define the distance thresholds for color stops
    
    # Calculate distances of all vertices from the target vertex
    distances = np.linalg.norm(vertices - target, axis=1) * 15

    
    for threshold, stop_color in zip(thresholds, color_stops):
        mask = distances < threshold
        
        # Calculate blending factor
        blend_factor = (1 - distances[mask] / threshold)[:, None]
        
        # Directly assign colors based on the blend factor and stop color
        colors[mask] = blend_factor * stop_color + (1 - blend_factor) * colors[mask]
        
    # Ensure the target index is assigned the strongest heatmap color
    # colors[target_index] = color_stops[0]
    return colors
    

def create_3d_model(patient):
        scans = patient.us_scans
        # list_coords = []
        # areMalignant = []
        # for scan in scans:
        #     scan:US_scan = scan
        #     list_coords.append(scan.coordinates)
        #     isMal = True if scan.diagnosis=="Malignant" else False
        #     areMalignant.append(isMal)
        scene = pywavefront.Wavefront('assets/torso.obj', collect_faces=True)
        vertices = np.array(scene.vertices)
        faces = np.array(scene.mesh_list[0].faces)

        # Debug: Check if vertices and faces are loaded
        # print("Number of vertices:", len(vertices))
        # print("Number of faces:", len(faces))

        # Check if vertices and faces are non-empty
        if len(vertices) == 0 or len(faces) == 0:
            raise ValueError("Model vertices or faces are not loaded correctly. Please check the OBJ file path and format.")

        # Calculate smooth normals
        vertex_normals = calculate_vertex_normals(vertices, faces)
        colors = np.full((len(vertices), 3), [1., 1., 1.]) 

        # Define gradient colors
        vertex_labels = {}
        for i,scan in enumerate(scans):
            scan = scan
            col = ord(scan.coordinates[0])-ord('A')
            row = int(scan.coordinates[1])-1
            print("coord:",row,col)
            target_index = index_list[row][col]
            isMalignant = True if scan.diagnosis=="Malignant" else False
            color_stops = np.array([ORANGE,ORANGE,RED]) if isMalignant else np.array([LIGHT_BLUE,PURPLE,BLUE])

            colors = calculate_gradient_colors(vertices,colors,target_index,color_stops,scan.id,vertex_labels)
            vertex_labels[i] = {f"{row},{col}":scan.id}

        
        for scan in scans:
            col = ord(scan.coordinates[0].upper())-ord('A')
            row = int(scan.coordinates[1])-1
            target_index = index_list[row][col]
            isMalignant = True if scan.diagnosis=="Malignant" else False
            colors[target_index] = RED if isMalignant else BLUE

        
        # Create a trimesh object
        mesh = trimesh.Trimesh(vertices=vertices, faces=faces, vertex_normals=vertex_normals, vertex_colors=colors)

        if mesh.is_empty:
            raise ValueError("Trimesh object is empty. Check the mesh creation process.")



        # vertex_labels = {i: {"label": f"Vertex {i}"} for i in range(len(mesh.vertices))}

        mesh.metadata['vertex_labels'] = vertex_labels

        # vertex_index = 0
        # print(f"Metadata for vertex {vertex_index}: {mesh.metadata['vertex_labels'][vertex_index]}")




        # Export the mesh to GLB
        glb_path = f'assets/models_3d/{patient.id}.glb'
        mesh.export(glb_path)
        # print(f"Model exported to {glb_path}")

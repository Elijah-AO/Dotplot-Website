from flask import request, Blueprint, jsonify, send_file, abort, send_from_directory
from os import path, getcwd, makedirs
from datetime import datetime

from ..database import US_scan_helper as US_scan_db
from ..database.models import US_scan
IMAGE_DIR = "assets/US_scans"
MODEL_3D_DIR = path.join("..","..","assets","models_3d")

us_scan_route = Blueprint('us_scan',__name__)

@us_scan_route.route('/us-scan',methods=['GET','POST'])
def us_scan_endpoint():
    if request.method == 'GET':
        scans = [scan.to_dict() for scan in US_scan_db.get_all()]
        return scans,200
    if request.method == 'POST':
        coordinates = request.json.get("coordinates", None)
        scan_date = request.json.get("scan_date", None)
        diagnosis = request.json.get("diagnosis", None)
        patient_id = request.json.get("patient_id", None)
        print(coordinates,scan_date,diagnosis,patient_id)
        if not coordinates or not scan_date or not diagnosis:
            return {"error":"please provide coordinates, scan_date, diagnosis and patient_id"},400
        try:
            date = datetime.strptime(scan_date, "%d/%m/%Y")
            scan = US_scan(coordinates=coordinates,scan_date=date,diagnosis=diagnosis,patient_id=int(patient_id))
            US_scan_db.save_(scan)
            return {"msg":f"saved scan","id": f"{scan.id}"}
        except Exception:
            return {"error":str(Exception)},400

@us_scan_route.route('/us-scan/<id>',methods=['GET','DELETE','PATCH'])
def get_us_scan(id):
    if request.method == 'GET':
        
        if scan:=US_scan_db.get_by_id(id):
            return scan.to_dict()
    if request.method == 'DELETE':
        if scan:=US_scan_db.get_by_id(id):
            US_scan_db.delete_by_id(id)
            return {"msg":f"deleted scan with id {scan.id}"}
        else:
            return {"error":f"not found scan with id {scan.id}"},400
  
        
    if request.method == 'PATCH':
        coordinates = request.json.get("coordinates", None)
        scan_date = request.json.get("scan_date", None)
        diagnosis = request.json.get("diagnosis", None)
        patient_id = request.json.get("patient_id", None)

        scan = US_scan_db.get_by_id(id)
        if coordinates:
            scan.coordinates = coordinates
        if scan_date:
            scan.scan_date = scan_date
        if diagnosis:
            scan.diagnosis = diagnosis
        if patient_id:
            scan.patient_id = patient_id

        US_scan_db.update_(scan)

        return  {"msg":f"updated scan with id {scan.id}"}
        

@us_scan_route.route('/us-scan/image/<id>',methods=['GET','POST'])
def image_endpoint(id):
    if request.method == 'GET':
        scan = US_scan_db.get_by_id(id)
        if not scan:
            return {"error":"invalid US scan ID"},404
        dir = path.join("..","assets","US_scans")
        image_path = path.join(dir,f"{scan.id}.png")
        return send_file(image_path, mimetype='image/png')
    

    if request.method == 'POST':
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        # print("keys:")
        # print(request.files.keys())
        # print(request.files)
        file = request.files['image']


        # if file.filename == '':
        #     return jsonify({"error": "No selected file"}), 400

        if not file.filename.lower().endswith(('.png')):
            return jsonify({"error": "Unsupported file type - only png is supported"}), 400

        image_path = IMAGE_DIR+f"/{id}.png"
        file.save(image_path)


        return jsonify({"success": "Image saved successfully"}), 200


@us_scan_route.route('/us-scan/model3D/<id>',methods=['GET','POST'])
def model_3d_endpoint(id):
    if request.method == 'GET':
        return send_file(f"../assets/models_3d/{id}.glb",mimetype="model/gltf-binary")
        # return send_from_directory("../assets/models_3d",f"{id}.glb",as_attachment=True)
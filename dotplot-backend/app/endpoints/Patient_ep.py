from flask import request, Blueprint, jsonify
import json

from ..database.models import Patient, US_scan
from ..database import Patient_helper as patient_db

patient_route = Blueprint('patients',__name__)

@patient_route.route('/patient',methods=['GET','POST'])
def patient_endpoint():
    if request.method == 'GET':
        all_patients = [patient.to_dict() for patient in patient_db.get_all()]
        return all_patients,200
    if request.method == 'POST':
        patient_name = request.json.get("patient_name", None)
        age = request.json.get("age", None)
        height = request.json.get("height", None)
        weight = request.json.get("weight", None)
        bc_history = request.json.get("bc_history", None)

        if not patient_name or not age or not height or not weight or not bc_history:
            return {"error":"please provide patient_name, age, height, weight and bc_history"},400
        try:
            patient = US_scan(patient_name=patient_name,age=int(age),height=int(height),weight=int(weight),bc_history=bool(bc_history))
            patient_db.save_(patient)
            return {"msg":f"saved patient with id {patient.id}"}
        except Exception:
            return {"error":str(Exception)},400

@patient_route.route('/patient/<id>',methods=['GET','DELETE','PATCH'])
def get_patient(id):


    patient = patient_db.get_by_id(id) 

    if patient == None:
        response = {
        "error": "Bad Request",
        "message": "Patient with given ID does not exist"
        }
        return jsonify(response),400
    
    if request.method == 'GET':
        return patient.to_dict()
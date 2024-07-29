from flask import request, Blueprint, jsonify
import json

from ..database.models import Patient, US_scan
from ..database import Patient_helper as patient_db

patient_route = Blueprint('patients',__name__)

@patient_route.route('/patient',methods=['GET','POST'])
def patient_endpoint():
    if request.method == 'GET':
        all_patients = [patient.to_dict() for patient in patient_db.get_all()]
        return jsonify(all_patients), 200
    if request.method == 'POST':
        try:
            data = request.json
            print("Received data:", data)  # Log received data
            patient_name = data.get("patient_name")
            age = data.get("age")
            height = data.get("height")
            weight = data.get("weight")
            bc_history = data.get("bc_history")

            if not patient_name or not age or not height or not weight or bc_history is None:
                print("Missing required fields")  # Log missing fields
                return jsonify({"error": "Please provide patient_name, age, height, weight, and bc_history"}), 400

            patient = Patient(
                patient_name=patient_name,
                age=int(age),
                height=int(height),
                weight=int(weight),
                bc_history=bc_history == 'true'
            )
            patient_db.save_(patient)
            return jsonify({"msg": f"Saved patient with id {patient.id}"}), 200
        except Exception as e:
            print("Error:", str(e))  # Error Log
            return jsonify({"error": str(e)}), 400
        
        

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
    if request.method == 'DELETE':
        patient_db.delete_(patient)
        return {"msg":"patient deleted successfully"}
from flask import request, Blueprint, jsonify
import json

from ..database.models import Patient, US_scan
from ..database import Patient_helper as patient_db

patient_route = Blueprint('patients',__name__)

@patient_route.route('/patient',methods=['GET','POST'])
def author_endpoint():
    if request.method == 'GET':
        all_patients = [patient.to_dict() for patient in patient_db.get_all()]
        return all_patients,200

@patient_route.route('/patient/<id>',methods=['GET','DELETE','PATCH'])
def get_author(id):


    patient = patient_db.get_by_id(id) 

    if patient == None:
        response = {
        "error": "Bad Request",
        "message": "Patient with given ID does not exist"
        }
        return jsonify(response),400
    
    if request.method == 'GET':
        return patient.to_dict()
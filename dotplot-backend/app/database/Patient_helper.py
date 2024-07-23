from app import db
from .models import Patient
from sqlalchemy import select, delete, update, and_

def save_(patient:Patient):
    db.session.add(patient)
    db.session.commit()

def get_all():
    return db.session.execute(select(Patient).where()).scalars()

def get_by_id(id:int) -> Patient:
    return db.session.execute(select(Patient).where(Patient.id == id)).scalar_one_or_none()


def delete_(patient:Patient):
    db.session.delete(patient)
    db.session.commit()

def delete_by_id(id:int):
    db.session.delete(get_by_id(id))
    db.session.commit()

def update_(patient:Patient):
    patient_original = get_by_id(patient.id)
    if patient_original:
        patient_original.patient_name = patient.patient_name
        patient_original.age = patient.age
        patient_original.height = patient.height
        patient_original.weight = patient.weight
        patient_original.bc_history = patient.bc_history
        db.session.commit()
    else:
        print("Error: update object does not exist")
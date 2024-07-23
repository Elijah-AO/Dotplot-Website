from app import db
from .models import US_scan
from sqlalchemy import select, delete, update, and_

def save_(us_scan:US_scan):
    db.session.add(us_scan)
    db.session.commit()

def get_by_id(id:int) -> US_scan:
    return db.session.execute(select(US_scan).where(US_scan.id == id)).scalar_one_or_none()


def delete_(us_scan:US_scan):
    db.session.delete(us_scan)
    db.session.commit()

def delete_by_id(id:int):
    db.session.delete(get_by_id(id))
    db.session.commit()

def update_(us_scan:US_scan):
    us_scan_original = get_by_id(us_scan.id)
    if us_scan_original:
        us_scan_original.coordinates = us_scan.coordinates
        us_scan_original.scan_date = us_scan.scan_date
        us_scan_original.diagnosis = us_scan.diagnosis
        us_scan_original.patient_id = us_scan.patient_id
        db.session.commit()
    else:
        print("Error: update object does not exist")
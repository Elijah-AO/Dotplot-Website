from app import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String, Date, Integer, Boolean
from datetime import date

class Patient(db.Model):
    __tablename__ = 'patient'

    id: Mapped[int] = mapped_column(primary_key=True)

    patient_name: Mapped[str] = mapped_column(String(50),nullable=False)
    age: Mapped[int] = mapped_column(Integer,nullable=False)
    height: Mapped[int] = mapped_column(Integer,nullable=False)
    weight: Mapped[int] = mapped_column(Integer,nullable=False)
    bc_history: Mapped[bool] = mapped_column(Boolean,nullable=False)
    us_scans = db.relationship('US_scan')

    def to_dict(self):
        return {
            'id' : self.id,
            'patient_name':self.patient_name,
            'age' : self.age,
            'height' : self.height,
            'weight' : self.weight,
            'bc_history' : self.bc_history,
            'US_scans' : list(map(lambda scan: scan.to_dict(),self.us_scans)),
        }

class US_scan(db.Model):
    __tablename__ = 'us_scan'

    id: Mapped[int] = mapped_column(primary_key=True)
    coordinates: Mapped[str] = mapped_column(String(2),nullable=False)
    scan_date: Mapped[date] = mapped_column(Date,nullable=False)
    diagnosis: Mapped[str] = mapped_column(String(20),nullable=False)
    patient_id: Mapped[int] = mapped_column(ForeignKey('patient.id'),nullable=False)

    # patient = db.relationship('Patient')

    def to_dict(self):
        return {
            'id' : self.id,
            'coordinates':self.coordinates,
            'scan_date' : self.scan_date,
            'diagnosis' : self.diagnosis,
            'patient_id' : self.patient_id,
        }

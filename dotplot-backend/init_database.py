from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String, Date, Integer, Boolean
from datetime import date,datetime
import csv
from dotenv import load_dotenv
import os

load_dotenv()
password = os.getenv('PASSWORD')

db = SQLAlchemy()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql+psycopg2://postgres:"+password+"@localhost:5432/dotplotwebsite"
db.init_app(app)

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
            'US_scans' : list(map(lambda scan: scan.to_dict(),self.US_scans)),
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


patientDict = {}


with app.app_context():
    db.create_all()

    with open('assets/Patients.csv', mode ='r')as file:
        csvFile = csv.reader(file)
        next(csvFile, None) 
        for line in csvFile:
            for scan_id in line[6].split():
                patientDict[int(scan_id)] = int(line[0])
        # print(patientDict)

            patient = Patient(id=int(line[0]),patient_name=line[1],age=int(line[2]),height=int(line[3]), \
                              weight=int(line[4]),bc_history=(True if line[5]=="Yes" else False)
                              )
            db.session.add(patient)
        db.session.commit()

    with open('assets/US_scans.csv', mode ='r')as file:
        csvFile = csv.reader(file)
        next(csvFile, None) 

        for line in csvFile:
            if int(line[0]) in patientDict.keys():
                patient_id = patientDict[int(line[0])]
                scan = US_scan(id = int(line[0]),coordinates = line[1],scan_date = datetime.strptime(line[2], "%d/%m/%Y"), \
                            diagnosis = line[3],patient_id = patient_id)
                db.session.add(scan)
        db.session.commit()
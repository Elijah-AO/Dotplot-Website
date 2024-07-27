from app.model_3D.color_vert_smooth import create_3d_model
from app.database import Patient_helper
from flask import Flask
from app import db
from dotenv import load_dotenv
import os

load_dotenv()
password = os.getenv('PASSWORD')
db_port = os.getenv('DATABASE_SERVER_PORT')
db_name = os.getenv('DATABASE_NAME')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql+psycopg2://postgres:{password}@localhost:{db_port}/{db_name}"
db.init_app(app)

with app.app_context():
    patients = Patient_helper.get_all()

    for patient in patients:
        isMaligs = []
        coords = []
        for scan in patient.us_scans:
            isMalig = True if scan.diagnosis=="Malignant" else False
            isMaligs.append(isMalig)
            coords.append(scan.coordinates)
        print(coords)
        create_3d_model(patient)
        # break
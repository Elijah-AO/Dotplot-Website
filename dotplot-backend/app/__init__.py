from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS
from datetime import timedelta
from dotenv import load_dotenv
import os

db = SQLAlchemy()
load_dotenv()

def create_app():
    backend = Flask(__name__)

    CORS(backend)
    password = os.getenv('PASSWORD')
    
    backend.config['SQLALCHEMY_DATABASE_URI'] = "postgresql+psycopg2://postgres:"+password+"@localhost:5432/dotplotwebsite"

    db.init_app(backend)

    from app.endpoints.Patient_ep import patient_route
    # from app.endpoints.US_scan_ep import us_scan_route

    backend.register_blueprint(patient_route, url_prefix='/api')
    # backend.register_blueprint(us_scan_route, url_prefix='/api')

    backend.run()
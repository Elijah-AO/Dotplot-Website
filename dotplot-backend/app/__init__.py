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
    db_port = os.getenv('DATABASE_SERVER_PORT')
    db_name = os.getenv('DATABASE_NAME')
    
    backend.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql+psycopg2://postgres:{password}@localhost:{db_port}/{db_name}"

    db.init_app(backend)

    from app.endpoints.Patient_ep import patient_route
    from app.endpoints.US_scan_ep import us_scan_route

    backend.register_blueprint(patient_route, url_prefix='/api')
    backend.register_blueprint(us_scan_route, url_prefix='/api')

    backend.run()
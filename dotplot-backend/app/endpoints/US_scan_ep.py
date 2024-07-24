from flask import request, Blueprint, jsonify, send_file, abort
from os import path, getcwd

from ..database import US_scan_helper as US_scan_db

IMAGE_DIR = path.join("..","assets","US_scans")

us_scan_route = Blueprint('us_scan',__name__)

@us_scan_route.route('/us-scan/<id>',methods=['GET','POST'])
def author_endpoint(id):
    if request.method == 'GET':
        scan = US_scan_db.get_by_id(id)
        if not scan:
            return {"error":"invalid US scan ID"},404
        image_path = path.join(IMAGE_DIR,f"{scan.id}.png")

        # if not path.isfile(image_path):
        #     abort(404, description="Resource not found")

        return send_file(image_path, mimetype='image/png')
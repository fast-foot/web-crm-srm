from flask import Flask
from app.db.database import db_session
from app.model import model
from app.db.seed import run_seed

application = Flask(__name__)

#run_seed(db_session, model)

from app.web import view


# @application.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#     response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
#     response.headers.add('content-type', 'charset=utf-8')
#     return response

# remove database sessions at the end of the request or when the application shuts down
@application.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
import flask

from flask import render_template
from app import application


@application.route('/')
def index():
    return render_template('index.html')
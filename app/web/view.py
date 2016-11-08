import flask

from flask import render_template
from app import application


@application.route('/')
def index():
    return render_template('index.html')


@application.route('/srm')
def srm_supply():
    return render_template('forms/srm_supply.html')


@application.route('/crm')
def crm_supply():
    return render_template('forms/crm_supply.html')


@application.route('/supply/save')
def save_supply():
    return 'done'
import flask

from app.web import facade
from app import application


@application.route('/')
def index():
    return flask.render_template('index.html')


@application.route('/srm')
def srm_supply():
    return flask.render_template('forms/srm_supply.html')


@application.route('/crm')
def crm_supply():
    return flask.render_template('forms/crm_supply.html')


@application.route('/supply/save', methods=['POST'])
def save_supply():
    return facade.save_supply(flask.request)


@application.route('/send_email', methods=['POST'])
def send_email():
    return facade.send_email(flask.request)

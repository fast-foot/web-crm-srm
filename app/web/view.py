import flask

from app.web import facade
from app import application


@application.route('/')
def index():
    return flask.render_template('index.html', data={})


@application.route('/srm')
def srm_supply():
    return flask.render_template('forms/srm_supply.html')


@application.route('/crm')
def crm_supply():
    return flask.render_template('forms/crm_supply.html')


@application.route('/supply/export', methods=['POST'])
def export_supply():
    return facade.export_supply(flask.request)


@application.route('/send_email', methods=['POST'])
def send_email():
    return facade.send_email(flask.request)


@application.route('/supply/save', methods=['POST'])
def save_supply():
    return facade.save_supply(flask.request)


@application.route('/deals', methods=['GET'])
def get_deals():
    return flask.render_template('forms/deals_history.html', deals=facade.get_deals())


@application.route('/analyze_deal', methods=['POST', 'GET'])
def analyze_deal():
    data = facade.analyze_deal(flask.request)
    return flask.render_template('forms/deals_analyzer.html', data=data)

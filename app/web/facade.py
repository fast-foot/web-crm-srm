import json

from app.service.service import Service
from app.service.mail_service import MailService
from app.service.database_service import DBService

xsl_file_path = '/home/alex/Documents/WorkSpace/univer/projects/' \
                'web-srm-crm/app/static/sheets/Products Suggestion.xslx'

service = Service(file_path=xsl_file_path)


def export_supply(flask_request):
    print(flask_request.get_data('data'))
    data = json.loads(flask_request.get_data('data').decode('utf-8'))
    service.write_sheet(data)
    return 'Exported successfully!'


def save_supply(flask_request):
    data = json.loads(flask_request.get_data('data').decode('utf-8'))
    result = DBService().save_data(data)
    return result


def send_email(flask_request):
    data = json.loads(flask_request.get_data('data').decode('utf-8'))
    if data['contactDetails'].get('Contact Email'):
        service.write_sheet(data)
        MailService().send_email(recipient_email=data['contactDetails']['Contact Email'],
                                 recipient_name=data['contactDetails']['Contact Name'],
                                 subject='Suggestion of products from our company!',
                                 file_path=xsl_file_path)
        return 'Email sent successfully!'
    else:
        return 'Failed to send email.'

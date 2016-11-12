import json

from app.service.service import Service

service = Service(file_path='/home/alex/Documents/WorkSpace/univer/projects/web-srm-crm/app/static/sheets/Products Suggestion.xslx')


def save_supply(flask_request):
    print(flask_request.get_data('data'))
    data = json.loads(flask_request.get_data('data').decode('utf-8'))
    service.write_sheet(data)
    return 'Saved!'


def send_email(flask_request):
    data = json.loads(flask_request.get_data('data').decode('utf-8'))
    if data['contactDetails'].get('Contact Email'):
        service.send_email(data=data,
                           recipient_email=data['contactDetails']['Contact Email'],
                           recipient_name=data['contactDetails']['Contact Name'],
                           subject='Suggestion of products from our company!')
        return 'Email sent successfully!'
    else:
        return 'Failed to send email.'

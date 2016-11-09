import json

from app.service.service import Service

service = Service()


def save_supply(flask_request):
    print(flask_request.get_data('data'))
    data = json.loads(flask_request.get_data('data').decode('utf-8'))
    service.write_sheet(data, file_name='/home/alex/Documents/WorkSpace/univer/projects/web-srm-crm/app/static/sheets/test.xslx')
    return 'Saved!'

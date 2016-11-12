from app.db.database import db_session
from app.model.model import *

from sqlalchemy import and_

import json
import datetime

our_company = {
    'id': 1,
    'name': 'PY'
}


class DBService(object):

    def save_data(self, data):
        if not data['contactDetails'].get('Company Name'):
            return 'Contact Company is not specified.'
        else:
            company = self.get_company(data['contactDetails']['Company Name'])
            if not company:
                company = self.create_company(data['contactDetails']['Company Name'])

            if not data['contactDetails'].get('Contact Name'):
                return 'Contact Name is not specified.'
            else:
                contact = self.get_contact(data['contactDetails']['Contact Name'], company)
                if not contact:
                    contact = self.create_contact(data['contactDetails'], company)

                manager = self.get_contact(data['managerDetails'], company)
                if not manager:
                    manager = self.create_manager(data['managerDetails'], company)

                self.create_deal(extraDetails=data['extraDetails'],
                                 products=data['products'],
                                 contact=contact,
                                 deal_type=data['supply_type'])

                db_session.commit()

                return 'Deal has been saved successfully!'

    def get_company(self, company_name):
        return db_session.query(Company).filter(Company.name == company_name).first()

    def create_company(self, company_name):
        company = Company(name=company_name)
        db_session.add(company)
        return company

    def get_contact(self, name, email):
        return db_session.query(Contact).filter(and_(Contact.name == name,
                                                Contact.email == email)).first()

    def create_contact(self, contact_details, company):
        contact = Contact(name=contact_details['Contact Name'],
                          company=company,
                          post=contact_details['Contact Position'],
                          email=contact_details['Contact Email'])
        db_session.add(contact)
        return contact

    def create_manager(self, manager_details, company):
        manager = Contact(name=manager_details['Name'],
                          company=company,
                          post=manager_details['Position'],
                          email=manager_details['Email'],
                          phone=manager_details['Phone'],
                          fax=manager_details['Fax'],
                          skype=manager_details['Skype'],
                          _type='Manager')
        db_session.add(manager)
        return manager

    def create_deal(self, extraDetails, products, contact, deal_type):
        data = {
            'extraDetails': extraDetails,
            'products': products
        }
        deal = Deal(data=json.dumps(data),
                    contact=contact,
                    created_date=datetime.datetime.utcnow(),
                    _type=deal_type)

        db_session.add(deal)
        return deal

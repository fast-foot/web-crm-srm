from app.db.database import db_session
from app.model.model import *

from sqlalchemy import and_

import json
import datetime

our_company = db_session.query(Company).filter(Company.name == 'PY').first()


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
                contact = self.get_contact(data['contactDetails']['Contact Name'],
                                           data['contactDetails']['Contact Email'])
                if not contact:
                    contact = self.create_contact(data['contactDetails'], company)

                manager = self.get_contact(data['managerDetails']['Name'],
                                           data['managerDetails']['Email'])
                if not manager:
                    manager = self.create_manager(data['managerDetails'])

                self.create_deal(extra_details=data['extraDetails'],
                                 products=data['products'],
                                 contact=contact,
                                 manager=manager,
                                 deal_type=data['supply_type'])

                db_session.commit()

                return 'Deal has been saved successfully!'

    @staticmethod
    def get_deals():
        deals = []

        for deal in db_session.query(Deal).all():
            deal_result = {}
            contacts = {}
            for contact in deal.contacts:
                if contact._type == 'Manager':
                    contacts['manager'] = {
                        'name': contact.name,
                        'company': contact.company.name,
                        'post': contact.post,
                        'email': contact.email,
                        'phone': contact.phone,
                        'fax': contact.fax,
                        'skype': contact.skype,
                    }
                else:
                    contacts['client'] = {
                        'name': contact.name,
                        'company': contact.company.name,
                        'post': contact.post,
                        'email': contact.email,
                    }
            deal_result['deal'] = {
                'data': json.loads(deal.data),
                'created_date': deal.created_date,
                'type': deal._type
            }
            deal_result['contacts'] = contacts
            deals.append(deal_result)

        return deals

    @staticmethod
    def get_company(company_name):
        return db_session.query(Company).filter(Company.name == company_name).first()

    @staticmethod
    def create_company(company_name):
        company = Company(name=company_name)
        db_session.add(company)
        return company

    @staticmethod
    def get_contact(name, email):
        return db_session.query(Contact).filter(and_(Contact.name == name,
                                                Contact.email == email)).first()

    @staticmethod
    def create_contact(contact_details, company):
        contact = Contact(name=contact_details['Contact Name'],
                          company=company,
                          post=contact_details['Contact Position'],
                          email=contact_details['Contact Email'])
        db_session.add(contact)
        return contact

    @staticmethod
    def create_manager(manager_details):
        manager = Contact(name=manager_details['Name'],
                          company=our_company,
                          post=manager_details['Position'],
                          email=manager_details['Email'],
                          phone=manager_details['Phone'],
                          fax=manager_details['Fax'],
                          skype=manager_details['Skype'],
                          _type='Manager')
        db_session.add(manager)
        return manager

    @staticmethod
    def create_deal(extra_details, products, contact, manager, deal_type):
        data = {
            'extraDetails': extra_details,
            'products': products
        }
        deal = Deal(data=json.dumps(data),
                    contact=contact,
                    created_date=datetime.datetime.utcnow(),
                    _type=deal_type)

        deal.contacts.append(contact)
        deal.contacts.append(manager)

        db_session.add(deal)
        return deal

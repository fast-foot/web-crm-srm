from sqlalchemy import Column, Integer, Boolean, String, Float, ForeignKey, Table, DateTime
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import relationship
from app.db.database import Base, init_db

import datetime


class Company(Base):
    __tablename__ = 'companies'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    contacts = relationship('Contact', back_populates='company')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Company(name={})>'.format(self.name)


class Contact(Base):
    __tablename__ = 'contacts'

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('companies.id'))
    company = relationship('Company', back_populates='contacts')
    #deal = relationship('Deal', back_populates='contact')
    deals = relationship('Deal', secondary='contacts_deals')
    name = Column(String(100))
    post = Column(String(40))
    email = Column(String(50))
    phone = Column(String(40))
    fax = Column(String(40))
    skype = Column(String(40))
    _type = Column(String(40)) # manager or not

    def __init__(self, name, company, post, email, phone=None, fax=None, skype=None, _type=None):
        self.name = name
        self.post = post
        self.email = email
        self.phone = phone
        self.fax = fax
        self.skype = skype
        self._type = _type
        self.company = company


class ContactDeal(Base):
    __tablename__ = 'contacts_deals'

    _id = Column(Integer, primary_key=True)
    contact_id = Column(Integer, ForeignKey('contacts.id'))
    deal_id = Column(Integer, ForeignKey('deals.id'))


# contact_deals = Table('contacts_deals', Base.metadata,
#                       Column('contact_id', ForeignKey('contacts.id')),
#                       Column('deal_id', ForeignKey('deals.id')),
#                       )

class Deal(Base):
    __tablename__ = 'deals'

    id = Column(Integer, primary_key=True)
    data = Column(JSON)
    #contact_id = Column(Integer, ForeignKey('contacts.id'))
    #contact = relationship('Contact', back_populates='deal')
    contacts = relationship('Contact', secondary='contacts_deals')
    #currency_id = Column(Integer, ForeignKey('currencies.id'))
    #description = Column(String(200))
    created_date = Column(DateTime, default=datetime.datetime.utcnow())
    _type = Column(String(30)) # CRM or SRM

    def __init__(self, data, created_date, _type, contact):
        self.data = data
        self.created_date = created_date
        self._type = _type
        self.contact = contact


# deal_plan_product = Table('deals_plans_products', Base.metadata,
#                       Column('deal_id', ForeignKey('deals.id')),
#                       Column('plan_id', ForeignKey('plans.id')),
#                       Column('product_id', ForeignKey('products.id'))
#                       )


# class Product(Base):
#     __tablename__ = 'products'
#
#     id = Column(Integer, primary_key=True)
#     name = Column(String(80))
#     sku = Column(String(40))
#     unit_price = Column(Float)
#     discount_unit_price = Column(Float)
#     discount = Column(Float)
#     unit_type = Column(String(50))
#     dimension = Column(String(20))
#     sale_start_date = Column(String(30))
#     sale_end_date = Column(String(30))
#     quantity = Column(String(30))
#     sale_description = Column(String(30))
#     date_of_receiving = Column(String(30))


# class Plan(Base):
#     __tablename__ = 'plans'
#
#     id = Column(Integer, primary_key=True)
#     data = Column(JSON)
#     plan_type_id = Column(Integer, ForeignKey('plan_types.id'))
#     plan_type = relationship('PlanType', uselist=False, back_populates='plan')
#     start_month = Column(String(30))
#     start_year = Column(String(5))
#     end_month = Column(String(30))
#     end_year = Column(String(5))
#     accepted = Column(Boolean, default=False)


# class PlanType(Base):
#     __tablename__ = 'plan_types'
#
#     id = Column(Integer, primary_key=True)
#     plan = relationship('Plan', back_populates='plan_type')
#     name = Column(String(40))
#     step = Column(String(40))


# class Currency(Base):
#     __tablename__ = 'currencies'
#
#     id = Column(Integer, primary_key=True)
#     name = Column(String(4))

init_db()

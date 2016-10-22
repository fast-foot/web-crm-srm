from sqlalchemy import Column, Integer, Boolean, String, Float, ForeignKey, Table, DateTime
from sqlalchemy.orm import relationship
from app.db.database import Base, init_db


class Company(Base):
    __tablename__ = 'companies'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    contacts = relationship('Contact', back_populates='company')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Company(name={})'.format(self.name)


class Contact(Base):
    __tablename__ = 'contacts'

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('companies.id'))
    manager = relationship('Manager', uselist=False, back_populates='contact')
    deal = relationship('Deal', back_populates='contact')
    name = Column(String(100))
    post = Column(String(40))
    email = Column(String(50))


class Manager(Base):
    __tablename__ = 'managers'

    id = Column(Integer, primary_key=True)
    contact_id = Column(Integer, ForeignKey('contacts.id'))
    phone = Column(String(40))
    fax = Column(String(40))
    skype = Column(String(40))


contact_deals = Table('contacts_deals', Base.metadata,
                      Column('contact_id', ForeignKey('contacts.id')),
                      Column('deal_id', ForeignKey('deals.id')),
                      )


class Deal(Base):
    __tablename__ = 'deals'

    id = Column(Integer, primary_key=True)
    contact_id = Column(Integer, ForeignKey('contacts.id'))
    currency_id = Column(Integer, ForeignKey('currencies.id'))
    description = Column(String(200))
    _type = Column(String(30)) # CRM or SRM


deal_plan_product = Table('deals_plans_products', Base.metadata,
                      Column('deal_id', ForeignKey('deals.id')),
                      Column('plan_id', ForeignKey('plans.id')),
                      Column('product_id', ForeignKey('products.id'))
                      )


class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True)
    name = Column(String(80))
    sku = Column(String(40))
    unit_price = Column(Float)
    promo_unit_price = Column(Float)
    promo = Column(Float)
    unit_type = Column(String(50))


class Plan(Base):
    __tablename__ = 'plans'

    id = Column(Integer, primary_key=True)
    plan_type = relationship('PlanType', uselist=False, back_populates='plan')
    amounts = relationship('Amount', back_populates='plan')
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    accepted = Column(Boolean, default=False)


class Amount(Base):
    __tablename__ = 'amounts'

    id = Column(Integer, primary_key=True)
    plan_id = Column(Integer, ForeignKey('plans.id'))
    value = Column(Integer)


class PlanType(Base):
    __tablename__ = 'plan_types'

    id = Column(Integer, primary_key=True)
    plan_id = Column(Integer, ForeignKey('plans.id'))
    name = Column(String(40))
    step = Column(Integer)


class Currency(Base):
    __tablename__ = 'currencies'

    id = Column(Integer, primary_key=True)
    name = Column(String(4))

init_db()
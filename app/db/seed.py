from faker import Faker

fake = Faker()

companies_count = 20


def fake_companies(Company):
    return [Company(name=fake.company()) for i in range(companies_count)]


def fake_contacts(Contact):
    return [Contact(name=fake.name(),
                    company_id=fake.random_int(min=1, max=companies_count),
                    post='Economist',
                    email=fake.free_email()) for i in range(companies_count)]


def generate_currency(Currency):
    return [Currency(name=abbr) for abbr in ('BYN', 'USD', 'EUR', 'RUB')]


def generate_plan_types(PlanType):
    return [PlanType(name=p[0], step=p[1]) for p in (('Strategic', 'quarter'),
                                                     ('Perspective', 'month'),
                                                     ('Operative', 'Decade'),
                                                     ('Current activity', ''),
                                                     ('Urgent request', ''))]


def fake_products(Product):
    products = ('Arabica 100%', 'Robusta', 'Dallmayer', 'Jacobs', 'Nescafe')
    return [Product(name=pr,
                    sku=fake.random_int(100, 300),
                    unit_price=fake.random_int(20, 350),
                    unit_type='coffee') for pr in products]


def run_seed(db_session, model):
    # db_session.add_all(fake_companies(model.Company))
    # db_session.add_all(fake_contacts(model.Contact))
    # db_session.add_all(fake_products(model.Product))
    # db_session.add_all(generate_plan_types(model.PlanType))
    # db_session.add_all(generate_currency(model.Currency))

    db_session.commit()

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.engine.url import URL
from app.db.settings import DATABASE

engine = create_engine(URL(**DATABASE), convert_unicode=True)

if not database_exists(engine.url):
    create_database(engine.url)

db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()


def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()
    Base.metadata.create_all(bind=engine)
    #Base.metadata.drop_all(bind=engine)
    #method for all tablse from database

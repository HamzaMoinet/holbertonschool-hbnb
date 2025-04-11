from flask import Flask
from flask_restx import Api
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialisation des extensions
bcrypt = Bcrypt()
jwt = JWTManager()
db = SQLAlchemy()

def create_app(config_class="config.DevelopmentConfig"):
    app = Flask(__name__)

    # Configuration de l'application
    app.config.from_object(config_class)
    app.config['SECRET_KEY'] = 'your_secret_key'

    # Initialisation des extensions avec l'application
    bcrypt.init_app(app)
    jwt.init_app(app)
    db.init_app(app)
    CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5000"}})  # Exemple pour un frontend local
    # Configuration de l'API avec autorisation Bearer
    authorizations = {
        'Bearer': {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization'
        }
    }
    api = Api(app, version='1.0',
              title='HBnB API',
              description='HBnB Application API',
              authorizations=authorizations,
              security='Bearer')

    # Importation et enregistrement des namespaces
    from app.api.v1.users import api as users_ns
    from app.api.v1.amenities import api as amenities_ns
    from app.api.v1.places import api as places_ns
    from app.api.v1.reviews import api as reviews_ns
    from app.api.v1.auth import api as auth_ns
    from app.api.v1.admin import api as admin_ns

    api.add_namespace(users_ns, path='/api/v1/users')
    api.add_namespace(amenities_ns, path='/api/v1/amenities')
    api.add_namespace(places_ns, path='/api/v1/places')
    api.add_namespace(reviews_ns, path='/api/v1/reviews')
    api.add_namespace(auth_ns, path='/api/v1/auth')
    api.add_namespace(admin_ns, path='/api/v1/admin')

    # Création des tables dans la base de données
    with app.app_context():
        db.create_all()

    return app

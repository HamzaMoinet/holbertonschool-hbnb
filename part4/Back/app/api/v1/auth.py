from flask import request, jsonify
from flask_restx import Namespace, Resource
from flask_jwt_extended import create_access_token
from app.models.user import User  # Assurez-vous que le modèle User existe
from app import bcrypt, db

api = Namespace('auth', description='Authentication operations')

@api.route('/login')
class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Vérification de l'utilisateur
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            # Génération du token JWT
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token)

        return jsonify({"message": "Invalid email or password"}), 401

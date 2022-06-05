from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Address
import os
from marshmallow import Schema, fields

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return app.send_static_file('index.html')
    
@cross_origin()    
@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    senha = request.json["senha"]
    nome = request.json["nome"]
    cpf = request.json["cpf"]
    pis = request.json["pis"]
    pais = request.json["pais"]
    estado = request.json["estado"]
    municipio = request.json["municipio"]
    cep = request.json["cep"]
    rua = request.json["rua"]
    numero = request.json["numero"]
    complemento = request.json["complemento"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(senha)
    new_address = Address(pais=pais, estado=estado,municipio=municipio, cep=cep, rua=rua, numero = numero, complemento = complemento)
    db.session.add(new_address)
    db.session.commit()
    new_user = User(email=email, senha=hashed_password, nome=nome, cpf=cpf, pis=pis, id_endereco=new_address.id)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id
    session["user_name"] = new_user.nome
    return jsonify({"status": "ok"}), 200

@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    senha = request.json["senha"]

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.senha, senha):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
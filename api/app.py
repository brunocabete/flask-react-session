from urllib import response
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User
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
    new_user = User(email=email, senha=hashed_password, nome=nome, cpf=cpf, pis=pis,pais=pais, estado=estado,municipio=municipio, cep=cep, rua=rua, numero = numero, complemento = complemento)
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
        "nome": user.nome,
        "cpf": user.cpf[-3:]
    })

@cross_origin()  
@app.route("/account", methods=["POST", "PUT", "DELETE"])
def account():
    if request.method == "POST":
        user = User.query.filter_by(id=session["user_id"]).first()
        if user is None:
            return jsonify({"error": "No content"}), 204

        return jsonify({
        "email" : user.email, 
        "nome" : user.nome, 
        "cpf" : user.cpf, 
        "pis" : user.pis, 
        "pais" : user.pais, 
        "estado" : user.estado, 
        "municipio" : user.municipio, 
        "cep" : user.cep, 
        "rua" : user.rua, 
        "numero" : user.numero, 
        "complemento" : user.complemento
        })

    if request.method == "PUT":
        user = User.query.get(session["user_id"])

        user.email = request.json["email"]
        user.nome = request.json["nome"]
        user.cpf = request.json["cpf"]
        user.pis = request.json["pis"]
        user.pais = request.json["pais"]
        user.estado = request.json["estado"]
        user.municipio = request.json["municipio"]
        user.cep = request.json["cep"]
        user.rua = request.json["rua"]
        user.numero = request.json["numero"]
        user.complemento = request.json["complemento"]
        db.session.commit()

        return {"Status": "Ok"}, 200
        
    if request.method == "DELETE":
        user = User.query.get(session["user_id"])
        db.session.delete(user)
        db.session.commit()

        return {"Status": "Ok"}, 200

@app.route("/logout", methods=["POST"])
def logout():

    session.clear()
    return {"Status": "Ok"}, 200




with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
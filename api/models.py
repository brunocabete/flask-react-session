from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
  id = db.Column(db.String(32), primary_key=True,default=get_uuid)
  nome = db.Column(db.String(100), nullable=False)
  cpf = db.Column(db.String(14), nullable=False)
  pis = db.Column(db.String(14), nullable=False)
  email = db.Column(db.String(100), nullable=False)
  senha = db.Column(db.Text, nullable=False)
  criado_em = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  endereco = db.relationship('Address', backref=db.backref('users', lazy=True))
  id_endereco = db.Column(db.Integer, db.ForeignKey('address.id'), nullable=False)



class Address(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  pais = db.Column(db.String(100), nullable=False)
  estado = db.Column(db.String(100), nullable=False)
  municipio = db.Column(db.String(100), nullable=False)
  cep = db.Column(db.String(20), nullable=False)
  rua = db.Column(db.String(100), nullable=False)
  numero = db.Column(db.String(10), nullable=False)
  complemento = db.Column(db.String(10), nullable=True)

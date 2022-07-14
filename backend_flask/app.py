from http.client import REQUEST_ENTITY_TOO_LARGE
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS


def create_app(config=None):
  app = Flask(__name__)
  app.config.update(dict(DEBUG=True))
  app.config.update(config or {})
  CORS(app)
  
  @app.route('/', defaults={'path': ''}, methods=['GET'])
  def getTest(path):
    return jsonify("asd", "Asd")


  return app


if __name__ == "__main__":
  port = int(3000)
  app = create_app()
  app.run(port=port)

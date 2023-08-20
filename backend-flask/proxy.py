from flask import Flask, request, make_response
from flask_cors import CORS
from requests import get, post

app = Flask(__name__)
CORS(app)
SITE_NAME = 'http://ssal.sparcs.org:30180/'

@app.route('/', defaults={'path': ''}, methods=['GET'])
def test(path):
  return {'msg': 'success'}

@app.route('/merge', methods=['POST'])
def merge():
  files = [file.stream.read() for file in request.files.getlist('files[]')]
  return post(
    f'{SITE_NAME}/merge',
    data=request.values.to_dict(),
    files=[('files[]', (str(i)+'.pdf', file, 'application/pdf')) for i,file in enumerate(files)]
  ).content

@app.route('/download/<path:path>', methods=['GET'])
def download(path):
    resp = make_response(get(f'{SITE_NAME}/download/{path}').content)
    resp.headers.set('Content-Type', 'application/pdf')
    resp.headers.set(
        'Content-Disposition', 'attachment', filename=f'{path}.pdf')
    return resp


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=int(443), ssl_context=("/etc/letsencrypt/live/pad-padder.olp.app/fullchain.pem", "/etc/letsencrypt/live/pad-padder.olp.app/privkey.pem"))
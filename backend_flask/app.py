# -*- coding: utf-8 -*-
# coding=gbk
import os
import database
from io import BytesIO
import sqlite3
import copy
from flask import Flask, render_template, request, send_file, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from PyPDF2 import PdfFileMerger

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(50))
    data = db.Column(db.LargeBinary)


@app.before_first_request
def create_tables():
    db.create_all()


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        files = request.files.getlist('file')
        for file in files:
            filename = file.filename
            filename.replace(' ', '\ ')
            upload = Upload(filename=filename, data=file.read())
            db.session.add(upload)
            db.session.commit()
            f"Uploaded: {filename}"
            #uploaded_files = file #request.files["file"]
            file.stream.seek(0)
            file.save("static/pdf_file/{}".format(filename))
            os.system('pdfcrop --margins 100 "static/pdf_file/{}" "static/pdf_file/{}"'.format(filename, filename))
            #with open("static/pdf_file/{}".format(file.filename), 'wb') as f:
            #    f.write(uploaded_files)
            database.save(filename)
    return render_template('index.html')


@app.route("/upload_pdf", methods=["POST"])
def upload_pdf():
    return render_template('upload_pdf.html')


@app.route("/upload_done", methods=["POST"])
def upload_done():
    house_list = database.load_list()
    length = len(house_list)
    return render_template("upload_done.html", house_list=house_list, length=length)


@app.route("/download/<upload_id>/")
def download(upload_id):
    upload = Upload.query.filter_by(id=upload_id).first()
    return send_file("static/pdf_file/{}".format(upload.filename),as_attachment=True)
    # return send_file(BytesIO(upload.data), download_name=upload.filename, as_attachment=True)
    # return "pdf_file/{}.pdf".format(upload.filename)

@app.route("/merge")
def merge():
    item_list = ''
    for item in database.load_list():
        item_list += ("'static/pdf_file/" + item[1] + "' ")
    os.system('pdftk {}cat output static/merged_file/complete.pdf'.format(item_list))
    return send_file('static/merged_file/complete.pdf',as_attachment=True)
    

if __name__ == '__main__':
    if not os.path.exists('db.sqlite'):
        db.create_all()
        app.run()

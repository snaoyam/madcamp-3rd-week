# -*- coding: utf-8 -*-
# coding=gbk
import os
import database_forPadding
import database_forText
from io import BytesIO
import sqlite3  # SQLite database 기능
import copy
from flask import Flask, render_template, request, send_file, redirect, url_for
from flask_sqlalchemy import SQLAlchemy # SQLite database 기능
from PyPDF2 import PdfFileMerger    # pdf merge 기능
from pathlib import Path    # 파일 확장자 없이 파일이름 가져오는 기능

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# class Upload(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     filename = db.Column(db.String(50))
#     data = db.Column(db.LargeBinary)


# @app.before_first_request
# def create_tables():
#     db.create_all()

@app.route('/')
def choose():
    # request.args.to_dict()['id']
    # 임시 초기화
    # database_forPadding.delete_all_files("static/before_add_padding/")
    # database_forPadding.delete_all_files("static/after_add_padding/")
    # database_forPadding.delete_all_files("static/merged_file/")
    # database_forText.delete_all_files("static/before_extract_text/")
    # database_forText.delete_all_files("static/after_extract_text/")
    return render_template('choose.html')


@app.route('/index1', methods=['GET', 'POST'])
def index1():
    if request.method == 'POST':
        files = request.files.getlist('file')
        for file in files:
            filename = file.filename
            filename.replace(' ', '\ ')
            # upload = Upload(filename=filename, data=file.read())
            # db.session.add(upload)
            # db.session.commit()
            # f"Uploaded: {filename}"
            file.stream.seek(0)
            file.save("static/before_add_padding/{}".format(filename))
            database_forPadding.save(filename,request.values.to_dict()['left'],request.values.to_dict()['top'],request.values.to_dict()['right'],request.values.to_dict()['bottom'] )
    return render_template('index1.html')


@app.route('/index2', methods=['GET', 'POST'])
def index2():
    if request.method == 'POST':
        files = request.files.getlist('file')
        for file in files:
            filename = file.filename
            filename.replace(' ', '\ ')
            # upload = Upload(filename=filename, data=file.read())
            # db.session.add(upload)
            # db.session.commit()
            # f"Uploaded: {filename}"
            file.stream.seek(0)
            file.save("static/before_extract_text/{}".format(filename))
            database_forText.save(filename)
    return render_template('index2.html')

@app.route("/upload_done1", methods=["POST"])
def upload_done1():
    house_list = database_forPadding.load_list()
    length = len(house_list)
    return render_template("upload_done1.html", house_list=house_list, length=length)

@app.route("/upload_done2", methods=["POST"])
def upload_done2():
    house_list = database_forText.load_list()
    length = len(house_list)
    return render_template("upload_done2.html", house_list=house_list, length=length)

@app.route("/download_padding_pdf/<int:upload_id>/")
def download_padding_pdf(upload_id):
    # upload = Upload.query.filter_by(id=upload_id).first()
    # house_info = database_forPadding.load_house(upload_id-1)
    filename = database_forPadding.load_house(upload_id-1)["filename"]
    left = database_forPadding.load_house(upload_id-1)["left"]
    top = database_forPadding.load_house(upload_id-1)["top"]
    right = database_forPadding.load_house(upload_id-1)["right"]
    bottom = database_forPadding.load_house(upload_id-1)["bottom"]
    os.system('pdfcrop --margins \'{} {} {} {}\' "static/before_add_padding/{}" "static/after_add_padding/{}"'.format(left, top, right, bottom, filename, filename))
    return send_file("static/after_add_padding/{}".format(filename),as_attachment=True)

@app.route("/download_extracted_text/<int:upload_id>/")
def download_extracted_text(upload_id):
    house_info = database_forText.load_house(upload_id-1)
    filename = database_forText.load_house(upload_id-1)["filename"]
    # upload = Upload.query.filter_by(id=upload_id).first()
    new_filename = Path("static/before_extract_text/{}".format(filename)).stem    # 파일 확장자 없이 파일명 가져오기
    os.system('pdftotext "static/before_extract_text/{}" "static/after_extract_text/{}.txt"'.format(filename, new_filename))
    return send_file("static/after_extract_text/{}.txt".format(new_filename),as_attachment=True)

@app.route("/merge")
def merge():
    item_list = ''
    for item in database_forPadding.load_list():
        download_padding_pdf(item[0])
        item_list += ("'static/after_add_padding/" + item[1] + "' ")
    print(item_list)
    print('pdftk {}cat output static/merged_file/complete.pdf'.format(item_list))

    os.system('pdftk {}cat output static/merged_file/complete.pdf'.format(item_list))
    return send_file('static/merged_file/complete.pdf',as_attachment=True)
    

if __name__ == '__main__':
    # if not os.path.exists('db.sqlite'):
    #     db.create_all()
        app.run()

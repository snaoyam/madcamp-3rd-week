import os
import database_forPadding
import database_forText
from io import BytesIO
import sqlite3  # SQLite database
import copy
from flask import Flask, render_template, request, send_file, redirect, url_for
from flask_sqlalchemy import SQLAlchemy # SQLite database
from PyPDF2 import PdfFileMerger    # pdf merge
from pathlib import Path    # 파일 확장자 없이 파일이름 가져오기
import json # json


app = Flask(__name__)


@app.route('/', methods=['GET'])    # Add padding to PDF 를 할지 extract text를 할지 선택
def choose():
    user_id=20010821
    return render_template('choose.html')


@app.route('/index1', methods=['GET', 'POST'])  # Add padding to PDF 선택시 : 편집할 PDF와, option(left, top, right, bottom) 입력
def index1():
    user_id=20010821
    try:
        if request.method == 'POST':
            files = request.files.getlist('file')
            for file in files:
                filename = file.filename
                filename.replace(' ', '\ ')
                file.stream.seek(0)
                file.save("static/before_add_padding/{}".format(filename))
                left = request.values.to_dict()['left']
                top = request.values.to_dict()['top']
                right = request.values.to_dict()['right']
                bottom = request.values.to_dict()['bottom']
                database_forPadding.save(filename,user_id,left,top,right,bottom)
                return Response(json.dumps({'msg': 'success'}), status=200)
    except:
        return Response(json.dumps({'msg': 'fail'}), status=403)


@app.route('/index2', methods=['GET', 'POST'])  # extract text 선택시 : text를 추출할 PDF 입력
def index2():
    user_id=20010821
    try:
        if request.method == 'POST':
            files = request.files.getlist('file')
            for file in files:
                filename = file.filename
                filename.replace(' ', '\ ')
                file.stream.seek(0)
                file.save("static/before_extract_text/{}".format(filename))
                database_forText.save(filename,user_id)
                return Response(json.dumps({'msg': 'success'}), status=200)
    except:
        return Response(json.dumps({'msg': 'fail'}), status=403)


@app.route("/upload_done1", methods=['GET', "POST"])    # Add padding to PDF 선택시 : upload된 PDF들의 list 나열
def upload_done1():
    try:
        user_id=20010821
        house_list = database_forPadding.load_list(user_id)
        length = len(house_list)
        return Response(json.dumps({'msg': 'success', 'data': house_list}), status=200)
    except:
        return Response(json.dumps({'msg': 'fail'}), status=403)


@app.route("/upload_done2", methods=['GET', "POST"])    # extract text 선택시 : upload된 PDF들의 list 나열
def upload_done2():
    try:
        user_id=20010821
        house_list = database_forText.load_list(user_id)
        length = len(house_list)
        return Response(json.dumps({'msg': 'success', 'data': house_list}), status=200)
    except:
        return Response(json.dumps({'msg': 'fail'}), status=403)


@app.route("/download_padding_pdf/<int:upload_id>/", methods=['GET', "POST"])   # Add padding to PDF 선택시 : 해당 PDF를 편집하여 출력
def download_padding_pdf(upload_id):
    user_id=20010821
    filename = database_forPadding.load_house(upload_id-1,user_id)["filename"]
    left = database_forPadding.load_house(upload_id-1,user_id)["left"]
    top = database_forPadding.load_house(upload_id-1,user_id)["top"]
    right = database_forPadding.load_house(upload_id-1,user_id)["right"]
    bottom = database_forPadding.load_house(upload_id-1,user_id)["bottom"]
    os.system('pdfcrop --margins \'{} {} {} {}\' "static/before_add_padding/{}" "static/after_add_padding/{}"'.format(left, top, right, bottom, filename, filename))
    return send_file("static/after_add_padding/{}".format(filename),as_attachment=True)


@app.route("/download_extracted_text/<int:upload_id>/", methods=['GET', "POST"])    # extract text 선택시 : 해당 PDF에서 TEXT 추출하여 출력
def download_extracted_text(upload_id):
    user_id=20010821
    filename = database_forText.load_house(upload_id-1,user_id)["filename"]
    new_filename = Path("static/before_extract_text/{}".format(filename)).stem    # 파일 확장자 없이 파일명 가져오기
    os.system('pdftotext "static/before_extract_text/{}" "static/after_extract_text/{}.txt"'.format(filename, new_filename))
    return send_file("static/after_extract_text/{}.txt".format(new_filename),as_attachment=True)


@app.route("/merge", methods=['GET', "POST"])   # Add padding to PDF 선택시 : 업로드된 모든 PDF들에 padding을 더한뒤 merge하여 출력
def merge():
    user_id=20010821
    item_list = ''
    for item in database_forPadding.load_list(user_id):
        download_padding_pdf(item[0])
        item_list += ("'static/after_add_padding/" + item[1] + "' ")
    if (item_list==''):
        return redirect(url_for("upload_done1"))
    else :
        os.system('touch static/merged_file/complete.pdf')  #  output 파일을 임의로 하나 만들어줌  
        os.system('pdftk {}cat output static/merged_file/complete.pdf'.format(item_list))
        return send_file('static/merged_file/complete.pdf',as_attachment=True)
    
    
if __name__ == '__main__':
        app.run(host='0.0.0.0', port=80)
        # app.run()
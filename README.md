# PDF_editor_demo
2022 Summer MadCamp Week3 

## Project name
PDF editor

## Teammates
POSTECH 컴퓨터공학과 박정은

KAIST 전산학부 문동우

## Environment
OS : Window

Frontend : Java Script

Backend : Python, HTML, css

IDE : Visual studio Code

Framework : Flask

Backend: flask + json

Database: SQLite

## Description
이 웹은 PDF에 padding을 추가할 수 있고, 여러 PDF를 upload시 병합할 수 있고, ,JPG, PNG 등과같이 PDF가 아닌 파일을 PDF로 전환해준다.

## Implementation Method
1. data 저장 : database_forPadding.csv
* 사용자의 id와 사용자가 입력한 option들은 csv 파일에 [ index,filename,user_id,left,top,right,bottom ]형식의 data를 가진 list로 저장된다.
* 입력된 user id에 따라서 오름차순으로 index값이 설정된다.
2. data 전달 : database_forPadding.py
* csv에 저장된 정보들은, database_forPadding.py를 통해 각 함수가 필요로 하는 특정 data들로 parsing되어 app.py로 전달된다.

## Usage
### tab1 – file upload
| | |                                    
|---|---|                   
| | |                   
첫 화면에선 file을 upload한다. 한번에 여러 파일을 Multi upload 할 수도 있다. 
Left, top, right, bottom 측에 얼마나 padding을 둘지에 대한 option또한 입력받는다.

### tab2 – file merge

| | |                   
|---|---|                   
| | |                   
upload된 file들중, 해당 user id가 upload한 file들을 모두 merge하여 반환해준다.
만약 입력받은 file이 PDF형식이 아닌 경우, 이는 PDF로 전환되어 merge작업이 이루어 진다.

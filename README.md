# PDF Padder
> 2022 여름 MadCamp 2분반 박정은, 문동우 팀

## Project Name
PDF Padder

## Teammates
* KAIST 전산학부 [문동우](https://github.com/snaoyam)
* POSTECH 컴퓨터공학과 [박정은](https://github.com/koyy001)

## Environment
* Frontend : NextJS with Typescript
* Backend : Flask, Python, SQL

## Description
PDF에 Padding을 추가할 수 있다. 추가적으로 여러 PDF 파일을 올려 하나의 파일로 병합하거나, image파이을 PDF로 전환할 수 있다.  \
PDF에 Padding을 추가한다면, 문서 텍스트 바로 위에 필기를 할 수 있는 공간을 확보할 수 있다는 이점이 있다.

## Server Implementation Method
1. data 저장 : database_forPadding.csv
* 사용자의 id와 사용자가 입력한 option들은 csv 파일에 [ index,filename,user_id,left,top,right,bottom ]형식의 data를 가진 list로 저장된다.
* 입력된 user id에 따라서 오름차순으로 index값이 설정된다.
2. data 전달 : database_forPadding.py
* csv에 저장된 정보들은, database_forPadding.py를 통해 각 함수가 필요로 하는 특정 data들로 parsing되어 app.py로 전달된다.

## Usage
### File Upload Page
|file upload 화면|                                  
|---|  
|![image](https://user-images.githubusercontent.com/93732046/179911253-632514d3-c13a-4261-8266-c01d20ab95b7.png)|
* 첫 화면에선 file을 upload한다.
* 업로드한 파일들을 preview로 보여준다.                    
* 한 번에 여러 파일을 Multi-upload 할 수도 있다. 
* preview 박스를 드래그하여 순서를 변경할 수 있다.
* Upload한 파일의 페이지 수가 많을 경우 앞쪽 일부 페이지만 보여준다. Expand Pages 버튼을 눌러 모든 페이지를 펼쳐 볼 수 있다.                   
* Left, top, right, bottom 측에 얼마나 padding을 둘지에 대한 option을 입력받는다.
* 입력한 option에 대하여 preview로 padding을 보여준다.

### File add padding complete
|merged file download 화면|                                  
|---|  
|![image](https://user-images.githubusercontent.com/93732046/179912254-34e13ce6-56b4-4d18-9bce-3bafd9d7e878.png)|

* 업로드한 파일들을 병합하고 패딩을 추가한 후 파일을 다운로드할 수 있는 페이지로 이동한다.               
* Download File 버튼을 눌러 파일을 직접 다운로드 가능하다
* 혹은 파일을 다운로드할 수 있는 시리얼 키를 제공한다

### File download from another device
|시리얼 키 input field|                                  
|---|  
|![image](https://user-images.githubusercontent.com/93732046/179911459-00f72bb7-4863-4239-be3a-37ae863b4bf8.png)|
* 파일 업로드 후 받은 시리얼 키를 페이지 상단의 input field에 입력하면 파일을 바로 다운로드할 수 있다.


### Demo Video
https://github.com/snaoyam/padpdf/assets/93732046/f4177b5b-5155-4c8b-ac0e-0f9d5547bd93



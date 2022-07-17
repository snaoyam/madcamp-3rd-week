import pandas as pd
import app
import os
from sklearn.datasets import load_iris

def save(filename, left, top, right, bottom):
    df = pd.read_csv("database_forPadding.csv")
    idx = len(df)
    new_df = pd.DataFrame({"filename": filename,
                            "left": left,
                            "top": top,
                            "right": right,
                            "bottom": bottom},
                          index=[idx])
    new_df.to_csv("database_forPadding.csv", mode="a", header=False)
    return None


def load_list():
    house_list = []
    df = pd.read_csv("database_forPadding.csv")
    for i in range(len(df)):
        tem_item = df.iloc[i].tolist()
        tem_item[0] += 1
        house_list.append(tem_item)
    print(house_list)
    return house_list


def now_index():
    df = pd.read_csv("database_forPadding.csv")
    return len(df) - 1


def load_house(idx):
    df = pd.read_csv("database_forPadding.csv")
    house_info = df.iloc[idx]
    return house_info


def string_list(dic, i):    # 파일들의 이름을 나열한 string 반환
    item_list = ''
    for item in load_list():
        if(i==-1):
            app.download_padding_pdf(item[0])
        item_list += ("'static/{}/".format(dic) + item[1] + "' ")
    return item_list


def delete_all_files(filePath):     # 폴더 내 전체 파일 삭제 (ㅠㅠ csv 내용 초기화하는거는 포기,,)
    # <폴더 내 전체 파일 삭제>   
    for file in os.scandir(filePath):
        os.remove(file.path)
        
    # <csv 내용 초기화 (하지만 초기화 안됨)>    
    # iris = pd.read_csv("database_forPadding.csv") 
    # if (now_index()>0):
    #     <방법1>
    #     iris2 = iris.drop(labels=range(0, now_index()), axis=0, inplace=True)
    #     <방법2>
    #     iris2 = iris.drop(labels=0,axis=0, inplace=True)
    #     iris2.head()
    #     <방법3>
    #     new_iris = iris.drop(0)
    #     new_iris.head()
    return None

if __name__ == "__main__":
    load_list()
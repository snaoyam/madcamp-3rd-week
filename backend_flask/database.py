import pandas as pd


def save(filename, left, top, right, bottom):
    idx = len(pd.read_csv("database.csv"))
    new_df = pd.DataFrame({"filename": filename,
                            "left": left,
                            "top": top,
                            "right": right,
                            "bottom": bottom},
                          index=[idx])
    new_df.to_csv("database.csv", mode="a", header=False)
    return None


def load_list():
    house_list = []
    df = pd.read_csv("database.csv")
    for i in range(len(df)):
        tem_item = df.iloc[i].tolist()
        tem_item[0] += 1
        house_list.append(tem_item)
    print(house_list)
    return house_list


def now_index():
    df = pd.read_csv("database.csv")
    return len(df) - 1


def load_house(idx):
    df = pd.read_csv("database.csv")
    house_info = df.iloc[idx]
    return house_info


if __name__ == "__main__":
    load_list()
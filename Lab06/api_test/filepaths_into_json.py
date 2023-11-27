import os
import json



def main():
  directory = "./zad7/files/generated/"

  file_list = os.listdir(directory)
  file_dict = {"files": file_list}

  json_data = json.dumps(file_dict)

  with open("./zad7/files/json/file_list.json", "w") as json_file:
    json_file.write(json_data)


if __name__ == "__main__":
  main()

import asyncio
import json
from pygelbooru import Gelbooru
import os
import requests
import filepaths_into_json

# API key/user ID is optional, but access may be limited without them
API_KEY = '1b860b7113f9224110a124ea01f684c1d6bf092a143dd64df53e61d98d34d0db'
USER_ID = '492076'
included_tags = ['gotoh_hitori', '1girl', 'height:<=3000']
excluded_tags = ['nude', 'rating:explicit', 'rating:questionable', 'nipples', 'swimwear', 'bikini']

gelbooru = Gelbooru('API_KEY', 'USER_ID')

async def get_json():
  results = await gelbooru.search_posts(tags=included_tags, exclude_tags=excluded_tags)
  return results

async def get_random():
    result = await gelbooru.random_post(tags=included_tags, exclude_tags=excluded_tags)
    return result


def save_images(links):
  directory = "./zad7/files/generated/"
  os.makedirs(directory, exist_ok=True)

  for link in links:
    response = requests.get(link)
    if response.status_code == 200:
      image_name = link.split("/")[-1]
      image_path = os.path.join(directory, image_name)
      with open(image_path, "wb") as file:
        file.write(response.content)
      print(f"Image saved: {image_path}")
    else:
      print(f"Failed to download image from: {link}")

async def main():
  mode = "random"

  if mode == "random":
    number_of_pictures = 40

    results = []
    for i in range(number_of_pictures):
      result = await get_random()
      print(result)
      results.append(result)

    id = 0
    processed_results = []
    for result in results:
      processed_element = {}
      processed_element['id'] = id
      processed_element['link'] = str(result)
      processed_results.append(processed_element)
      id += 1

    links = []
    for result in processed_results:
      links.append(result['link'])

    save_images(links)
  

  
    filepath = './zad7/files/hitori.json'
    if os.path.exists(filepath):
      os.remove(filepath)
    with open(filepath, 'w') as file:
      json.dump(processed_results, file)

    filepaths_into_json.main()

  # else:
  #   results = await get_json()

  # id = 0
  # processed_results = []
  # for result in results:
  #   processed_element = {}
  #   processed_element['id'] = id
  #   processed_element['link'] = str(result)
  #   processed_results.append(processed_element)
  #   id += 1
  # with open('./zad7/files/hitori.json', 'w') as file:
  #   json.dump(processed_results, file)



    

# Run the main function asynchronously
asyncio.run(main())


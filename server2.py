from platform import python_version
import sys
import dlib
print(dlib.DLIB_USE_CUDA)
print(dlib.__version__)
import requests
# cuda.set_device(0);
import face_recognition;
sys.setrecursionlimit(10**6)
print(python_version())
from cgi import parse_header, parse_multipart, parse_qs
import json
import cv2
import numpy as np
from time import time as timer
from multiprocessing.pool import ThreadPool
import json

from http.server import BaseHTTPRequestHandler, HTTPServer

import vk
from bs4 import BeautifulSoup
from requests.exceptions import HTTPError
import io
import os
import time
from google.cloud import vision
import countries
import weights
import operator
import math


weights_photo_tagsD = weights.Weights().getWeightsPhotoTags()
weights_groupsD = weights.Weights().getWeightsGroupsD()

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="key.json"

session = vk.Session(access_token='')
vk_api = vk.API(session, v='5.126', lang='ru', timeout=10)


class myHandler(BaseHTTPRequestHandler):
	def parse_POST(self):
		ctype, pdict = parse_header(self.headers['content-type'])

		if ctype == 'multipart/form-data':
			postvars = parse_multipart(self.rfile, pdict)
		elif ctype == 'application/x-www-form-urlencoded':
			length = int(self.headers['content-length'])
			postvars = parse_qs(self.rfile.read(length), keep_blank_values=1)
		else:
			postvars = {}
		return postvars
	def do_POST(self):
		postvars = self.parse_POST()
		self.send_response(200)
		self.send_header('Content-type','text/html')
		self.end_headers()
		path = self.path
		if path == "/api/addUsersToBD":	
			users = str(postvars[b'users']).replace("[b'","").replace("']","").replace("https://vk.com/","")
			# find_face_photos = str(postvars[b'find_face_photos']).replace("[b'","").replace("']","")
			usersURLS = users.split(";")
			usersURLS = ",".join(usersURLS)
			# findFacePhotoList = find_face_photos.split(";")
			foundedFaceList = addUsersToBD(usersURLS)
			self.wfile.write(bytes(str(foundedFaceList), 'utf-8'))
		if path == "/api/findFace":	
			photo = str(postvars[b'photo']).replace("[b'","").replace("']","")
			foundedFaceList = findFace(photo)
			self.wfile.write(bytes(str(foundedFaceList), 'utf-8'))
		if path == "/api/detectLandMarks":	
			user_id = str(postvars[b'user_id']).replace("[b'","").replace("']","")
			foundedFaceList = detect_landmarks(user_id)
			self.wfile.write(bytes(str(foundedFaceList), 'utf-8'))
		if path == "/api/getGroupsInfo":	
			user_id = str(postvars[b'user_id']).replace("[b'","").replace("']","")
			foundedFaceList = getGroupsInfo(user_id)
			self.wfile.write(bytes(str(foundedFaceList), 'utf-8'))
		if path == "/api/getRelationStatus":	
			user_id = str(postvars[b'user_id']).replace("[b'","").replace("']","")
			foundedFaceList = getRelationStatus(user_id)
			self.wfile.write(bytes(str(foundedFaceList), 'utf-8'))
		if path == "/api/getHideAge":	
			user_id = str(postvars[b'user_id']).replace("[b'","").replace("']","")
			foundedFaceList = getHideAge(user_id)
			self.wfile.write(bytes(str(foundedFaceList), 'utf-8'))

			


			
	def end_headers(self):
		self.send_header('Access-Control-Allow-Origin', '*')
		self.send_header('Access-Control-Allow-Methods', '*')
		self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
		return super(myHandler, self).end_headers()
knownEncodings = []
knownVKUIDS = []
def addUsersToBD(usersURLS):
	start = timer()

	uids = urlVkToId(usersURLS)

	photosUrls, uidsOut = uidsToPhotos(uids)
	
	images = ThreadPool(8).map(urlToImage, photosUrls)
	# results = ThreadPool(8).map(getImageAndBoxes, results)
	

	count = 0
	for image in images:
		try:
			boxes = face_recognition.face_locations(image, model="cnn")
			encodings = face_recognition.face_encodings(image, boxes)
			for encoding in encodings:
				knownEncodings.append(encoding)
				knownVKUIDS.append(uidsOut[count]) # не забыть вставить сюда номральный массив с айдишниками
		except Exception as e:
			print("addUsersToBD e = " + str(e))
		count = count + 1
	print(f"Elapsed Time: {timer() - start}")
	return '{"knownEncodings":' + str(len(knownEncodings)) + ', "knownVKUIDS": "' + str(len(knownVKUIDS)) + '"}';

def findFace(photo):
	regions = [50, 47, 77, 78]
	foundedFaceList = []
	age = 0
	try:
		image = urlToImage(photo)
		# try:
		# 	ageInfo = agender.detect_genders_ages(image)
		# 	age = ageInfo.age
		# except Exception as e:
		# 	pass
		boxes = face_recognition.face_locations(image, model="cnn")
		encodings = face_recognition.face_encodings(image, boxes)
		for otherEncoding in encodings:
			counter = 0
			for findEncoding in knownEncodings:
				results = face_recognition.compare_faces([findEncoding], otherEncoding,0.5) 
				if results[0] == True:
				    foundedFaceList.append(knownVKUIDS[counter])
				    pass
				else:
				    pass
				counter = counter + 1
	except Exception as e:
		print("findFace = " + str(e))
	vkInfo = []
	responseSSP = []

	isTerrorist = 0
	try:
		vkInfo = vk_api.users.get(user_ids=foundedFaceList[0],fields="photo_id,verified,sex,bdate,city,country,home_town,has_photo,photo_max,online,domain,has_mobile,contacts,site,education,universities,schools,status,last_seen,followers_count,common_count,occupation,nickname,relatives,relation,personal,connections,exports,activities,interests,music,movies,tv,books,games,about,quotes,can_post,can_see_all_posts,can_see_audio,can_write_private_message,can_send_friend_request,is_favorite,is_hidden_from_feed,timezone,screen_name,maiden_name,crop_photo,is_friend,friend_status,career,military,blacklisted,blacklisted_by_me,can_be_invited_group")
		vkInfo = vkInfo[0]
		if str(vkInfo['last_name'] + " " + vkInfo['first_name']) in parseTerrorists(): 
			isTerrorist = 1

		for region in regions:
			responseSSPTemp = checkFSSP(vkInfo['first_name'], "", vkInfo['last_name'], "", region)
			if len(responseSSPTemp['response']['result'][0]['result']) > 0:
				responseSSP = responseSSPTemp['response']['result'][0]['result']
				break
	except Exception as e:
		print("findFace = " + str(e))
		pass
	if age == 0:
		return str('{"foundedFaceList":' + str(foundedFaceList).replace("'",'"') + ', "vkInfo": ' + str(vkInfo).replace('"','\\"').replace("'",'"') + ', "responseSSP": ' + str(responseSSP) + ', "isTerrorist": ' + str(isTerrorist) +'}').replace("True","true").replace("False","false")
	else:
		return str('{"foundedFaceList":' + str(foundedFaceList) + ', "ageByPhoto": ' + str(age) + ', "vkInfo": ' + str(vkInfo) +'}').replace("'",'"').replace("True","true").replace("False","false")
def parseTerrorists():
    resp = requests.get("http://www.fedsfm.ru/documents/terrorists-catalog-portal-act?roistat_visit=98889")
    soup = BeautifulSoup(resp.text, 'lxml')
    return (soup.findAll("ol", {"class": "terrorist-list"}))
def loadFsspResult(task_id):
    url = "https://api-ip.fssp.gov.ru/api/v1.0/result"
    try:
        response = requests.get(url,params={'token': 'tiOOORxsMiFp', 'task' : task_id})
        response.raise_for_status()
    except HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')
    except Exception as err:
        print(f'Other error occurred: {err}')
    else:
        print('Success!')
        json_response = response.json()
        if (json_response['response']['status'] == 2):
            time.sleep(2)
            loadFsspResult(task_id)
        return json_response
def checkFSSP(first_name, second_name, last_name, birthday, region):
#     birthday в формате дд.мм.гггг
    url = "https://api-ip.fssp.gov.ru/api/v1.0/search/physical"
    try:
        response = requests.get(url,
                                params={'token': 'tiOOORxsMiFp', 'firstname' : first_name, 'secondname' : second_name, 'lastname' : last_name, 'region' : region, 'birthdate' : birthday},
                                headers={'Content-Type': 'application/json'})
        response.raise_for_status()
    except HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')
    except Exception as err:
        print(f'Other error occurred: {err}')
    else:
        json_response = response.json()
        time.sleep(2)
        return loadFsspResult(json_response["response"]["task"])


def urlVkToId(usersURLS): #
	uids = []
	try:
		response = vk_api.users.get(user_ids=usersURLS)
		# print("response = " + str(response))
		for user in response: 
			uids.append(user['id'])
	except Exception as e:
		print("urlVkToId = " + str(e))
		return uids
	return uids

def getRelationStatus(user_id):
	out = "Не определить"
	dicts = {
		"Не в браке": 1,
		"Встречается": 2,
		"Помолвлен(-а)": 3,
		"В браке": 4,
		"Всё сложно": 5,
		"В активном поиске": 6,
		"Влюблен(-а)": 7,
		"В гражданском браке": 8,
	}
	full_name = ""
	try:	
		response = vk_api.users.get(user_ids=user_id)
		full_name = response[0]['first_name'] + " " + response[0]['last_name']
		user_id = response[0]['id'] 
		print(full_name)
		
	except Exception as e:
		print("getRelationStatus full_name err = " + str(e))
	for key, value in dicts.items():

		try:
			response = vk_api.users.search(q=full_name, count=1000, status=value)

			for user in response['items']: 
				if str(user['id']) == str(user_id):
					out = key
					return str('{"out":"' + str(out) + '"}').replace("'",'"'); 
			time.sleep(0.4)
		except Exception as e:
			print("getRelationStatus err = " + str(e))
		
	return str('{"out":"' + str(out) + '"}').replace("'",'"'); 

def getHideAge(user_id):
	out = "Не определить"
	age_from = 10
	age_to = 80
	delta = 0
	full_name = ""
	try:	
		response = vk_api.users.get(user_ids=user_id)
		full_name = response[0]['first_name'] + " " + response[0]['last_name']
		user_id = response[0]['id'] 
		print(full_name)
		
	except Exception as e:
		print("getRelationStatus full_name err = " + str(e))
	for i in range(20):
		print("age_from")
		print(age_from)
		print("age_to")
		print(age_to)
		try:
			response = vk_api.users.search(q=full_name, count=1000, age_from=age_from, age_to=age_to)
			found = False
			for user in response['items']: 
				if str(user['id']) == str(user_id):
					found = True
			if age_from == age_to and found:
				return str('{"out":"' + str(age_from) + '"}').replace("'",'"');
			if found:
				delta = math.floor((age_to-age_from)/2)
				if delta == 0:
					delta = 1
				age_to = age_to - delta
			else:
				age_to = age_to + delta
				age_from = age_from + delta
			
			time.sleep(0.4)
		except Exception as e:
			time.sleep(0.4)
			print("getRelationStatus err = " + str(e))
		
	return str('{"out":"Не определить"}').replace("'",'"');
def uidsToPhotos(uids):
	photos = []
	uidsOut = []
	try:
		for id in uids:
			response = vk_api.photos.get(owner_id=id, album_id="profile", rev=1, count=10)
			print("id = " + str(id))
			print("response = " + str(response))
			for photo in response['items']:
				url = photo['sizes'][len(photo['sizes'])-3]['url']
				photos.append(url)
				uidsOut.append(id)
	except Exception as e:
		print("uidsToPhotos = " + str(e))
	return photos, uidsOut

def urlToImage(url):
	try:
		response = get(url);
		bytes = len(response.content)
		image = np.asarray(bytearray(response.content), dtype="uint8")
		image = cv2.imdecode(image, cv2.IMREAD_COLOR)
		return image
	except Exception as e:
		print("urlToImage = " + str(e))
		return 0

def urlToContent(url):
	try:
		response = get(url);
		bytes = len(response.content)
		# image = np.asarray(bytearray(response.content), dtype="uint8")
		return response.content
	except Exception as e:
		print("urlToImage = " + str(e))
		return 0

def get(url):
    try:
        return requests.get(url, timeout=0.8); 
    except Exception:
        pass

def detect_landmarks(user_id):
	urls = []
	response = vk_api.photos.get(owner_id=user_id,album_id="wall", rev=1, count=30)
	for photo in response['items']:
		for size in photo['sizes']:
			if size['width'] > 600 and size['height'] > 600:
				url = size['url']
				urls.append(url)
				break
	result = {}
	# urls = ["https://sun9-4.userapi.com/impf/c604625/v604625712/265c9/WwBwt2_6ygk.jpg?size=1280x960&quality=96&proxy=1&sign=a1649aba17c875e482fbe4e2c069efb3","https://sun9-12.userapi.com/impf/c623900/v623900048/2a2f1/ezedrrOTrno.jpg?size=816x1088&quality=96&proxy=1&sign=b9f44a4a1b515f4173fc845019eb340b","https://sun9-56.userapi.com/impf/c841138/v841138048/3aa38/TiBv8n5E7UU.jpg?size=744x744&quality=96&proxy=1&sign=b80d93be964e670e8e935a091a54f309"]
	contents = ThreadPool(8).map(urlToContent, urls)
	countryList = []
	tags_weight = 0
	tags_count = 1
	for content in contents:
		try:
			client = vision.ImageAnnotatorClient()
			# with io.open(path, 'rb') as image_file:
			# 	content = image_file.read()

			image = vision.Image(content=content)

			landmarkResponse = client.landmark_detection(image=image)
			landmarks = landmarkResponse.landmark_annotations


			labelsResponse = client.label_detection(image=image)
			labels = labelsResponse.label_annotations
			# return str(labelsResponse)+";"+str(landmarks)
			print('Labels:')
			# Получение объектов на картинке
			
			for label in labels:
				label = label.description
				if label in result:
					result[label] = result[label] + 1
				else:
					result[label] = 1
				try:
					weight = weights_photo_tagsD[label]
					print(weight)
					if weight is not None:
						tags_weight = tags_weight + weight
						tags_count = tags_count + 1
				except Exception as e:
					pass
				print(label)

			print('Landmarks:')
			# Получение координат и названий городов
			for landmark in landmarks:
				print(landmark.description)
				for location in landmark.locations:
					lat_lng = location.lat_lng
					print('Latitude {}'.format(lat_lng.latitude))
					print('Longitude {}'.format(lat_lng.longitude))
					cc = countries.CountryChecker('/home/admin2/TM_WORLD_BORDERS-0.3.shp')
					country = cc.getCountry(countries.Point(lat_lng.latitude, lat_lng.longitude)).iso
					print(country)
					countryList.append(country)

			
			# print(country)
		except Exception as e:
			print("detect_landmarks error = " + str(e))
	
	
	solvency = tags_weight / tags_count
	sorted_result = {}
	for key,value in reversed(sorted(result.items(), key=lambda kv: kv[1])):
		sorted_result[key] = value
	
	return str('{"tagsFromPhoto":' + str(sorted_result) + ', "countries": ' + str(countryList) + ', "solvency": ' + str(solvency) +'}').replace("'",'"');

def getGroupsInfo(user_id):
	domains = []
	tempWeightsGroups = []
	i = 0
	result = []
	for groupWeight in weights_groupsD:
		domain = list(groupWeight.keys())[0]
		groupWeight['domain'] = domain
		domains.append(domain)
		tempWeightsGroups.append(groupWeight)
		print(str(i))
		if i%25 == 24 or i == len(weights_groupsD)-1:
			for j in range(25-len(domains)):
				domains.append("upmob")
			print("domains")
			print(str(domains))
			response = vk_api.execute.isMembers(owner_id=user_id,group_id1=domains[0],group_id2=domains[1],group_id3=domains[2],group_id4=domains[3],group_id5=domains[4],group_id6=domains[5],group_id7=domains[6],group_id8=domains[7],group_id9=domains[8],group_id10=domains[9],group_id11=domains[10],group_id12=domains[11],group_id13=domains[12],group_id14=domains[13],group_id15=domains[14],group_id16=domains[15],group_id17=domains[16],group_id18=domains[17],group_id19=domains[18],group_id20=domains[19],group_id21=domains[20],group_id22=domains[21],group_id23=domains[22],group_id24=domains[23],group_id25=domains[24])
			print(response)
			print(response['items'])
			j = 0
			for c in str(response['items']):
				if c == "1":
					print("select")
					print(domains[j])
					result.append(tempWeightsGroups[j])
				j = j + 1
			domains = []
			tempWeightsGroups = []
			time.sleep(0.4)
		i = i + 1
	tags_weight = 0
	tags_count = 1
	for weight in result:
		tags_weight = tags_weight + weight[weight['domain']]
		tags_count = tags_count + 1
	solvency = tags_weight/tags_count
	return str('{"groupsInfo":' + str(result) + ', "solvency": ' + str(solvency) +'}').replace("'",'"');

server = HTTPServer(('193.106.172.231', 80), myHandler)
server.serve_forever()




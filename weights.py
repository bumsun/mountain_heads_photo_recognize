import json

class Weights:
    # A simple class 
    # attribute 
	weights_photo_tags = '{"Team Sport":1,"Vehicle":5,"Sea":5,"Academic certificate":5,"Botanical garden":1,"Chest":3,"Muscle":1,"Sports equipment":1,"Sports training":1,"Document":1,"Ocean":1,"Child":3,"Love":1,"Tennis":5,"Formal wear":5,"Car":5,"Pianist":1,"Music venue":1,"Glasses":1,"Ceremony":1,"Restaurant":5,"Mountain": 3,"alcoholic":  -5,"cigarette": -5,"smoking": -5,"fight": -5,"blood": -5,"wa": -5,"games": -5,"murder": -5,"knife": -5,"porno": -5,"erotica": -5,"terror": -5,"anger": -5,"Equestrianism": 1,"Eyewear": 1,"Basketball": 1,"White-collar worker": 1,"Fur": 1,"Windshield": 5,"Auto part": 5,"Vehicle door": 5,"Protest": -2,"Costume design": 3,"Child model": 5,"Gown": 1,"dress": 1,"Wine glass": -1,"À la carte food": 1,"Vision care": 1,"Airplane": 3,"Beauty": 1,"Plant": 1,"Tourism": 5,"Bride": 3,"Happy": 1,"Wedding": 3,"Microphone": 3,"Estate": 1,"Coast": 3,"Honeymoon":3,"Place of worship": 2,"Temple": 3,"Smile": 1,"Mural": 3,"Bouquet": 3,"Beach": 3,"Vegetation": 1,"Fashion": 3,"People in nature": 1,"Fashion design": 3,"Drinking": -3,"Stationery": 3,"Art": 1,"Office": 5,"Classical sculpture": 1,"Statue": 1,"Houseplant": 1,"Seminar": 3,"Classroom": 3,"Conference": 3,"Sports gear": 1,"Personal protective equipment": 1,"Motorcycle helmet": 3,"Software engineering": 3,"Computer": 1,"Computer monitor": 1,"Performing arts": 2,"Concert": -1,"Entertainment": -2,"Pc game": -5,"Baby carriage": 3,"Digital camera": 2,"Graphics software": 5,"Strategy video game": -5,"gambling": -5,"debauchery": -5,"weapon": -5,"gun": -5,"hemp": -5,"drugs": -5,"syringe": -5,"tattoo": -5,"prisoner": -5,"aggression": -5,"gym": 5,"business": 5,"fitness": 5,"work": 5}'
	weights_groups = """[{"volkswagenrussia": 3, "category":"auto"},
		{"bmwgrouprussia": 5, "category":"auto"},
		{"4129391": 5, "category":"auto"},
		{"hlebio": 5, "category":"food"},
		{"vkusno.doctor": 5, "category":"food"},
		{"fermaspb": 5, "category":"food"},
		{"akulovkaa": 5, "category":"food"},
		{"ranchorikon": 5, "category":"food"},
		{"ecoferma24": 5, "category":"food"},
		{"ilorantafarm": 5, "category":"food"},
		{"ladogaferma": 5, "category":"food"},
		{"fermagorki": 5, "category":"food"},
		{"ilorantafarm": 5, "category":"food"},
		{"sundayginza": 5, "category":"cafe"},
		{"ginzaproject": 5, "category":"cafe"},
		{"ginzaflowerhouse": 5, "category":"cafe"},
		{"ginzaforkids": 5, "category":"kids"},
		{"kidburg_msk": 5, "category":"kids"},
		{"detmir": 5, "category":"kids"},
		{"deliveryclub": 3, "category":"food"},
		{"yandex.chef": 5, "category":"cafe"},
		{"ginzaflowerhouse": 5, "category":"cafe"},
		{"taxovichkof": 3, "category":"transport"},
		{"yandex.taxi.voditeli": 3, "category":"work"},
		{"edadeal_moscow": -2, "category":"food"},
		{"sekretnoe_slovo_labirint": 1, "category":"cafe"},
		{"pyaterochka_shop": -2, "category":"food"},
		{"theap": -2},
		{"savills": 5},
		{"stonebridgeestate": 5},
		{"elitnaya_nedvijimost": 5},
		{"travelradar": 3, "category":"travel"},
		{"aviasalesru": 3, "category":"travel"},
		{"onetwotrip": 3, "category":"travel"},
		{"triptodreamru": 3, "category":"travel"},
		{"vodohod": 5},
		{"airbnb": 5, "category":"travel"},
		{"795117": 5},
		{"lingualeo": 5},
		{"slonakupi_com": -2, "category":"food"},
		{"haljava90": -2, "category":"shopping"},
		{"piterfreee": 5, "category":"shopping"},
		{"hulla": -2, "category":"shopping"},
		{"skyscanner": 5, "category":"travel"},
		{"aliexpress": -2, "category":"shopping"},
		{"autoliexpres": 5, "category":"auto"},
		{"spb.sales": -2, "category":"shopping"},
		{"ithebusinessman": 5, "category":"business"},
		{"emploer4you": 5, "category":"business"},
		{"baracholka11": -5, "category":"shopping"},
		{"medic_students": -5, "category":"student"},
		{"studentengineer": -5, "category":"student"},
		{"stoodent": -5, "category":"student"},
		{"stoodent": -5, "category":"student"},
		{"businessvision": 5, "category":"business"},
		{"1business_idea": 5, "category":"business"},
		{"habrfun": 5, "category":"it"},
		{"robotzaimet": -5, "category":"dolg"},
		{"chanelofficial": 5, "category":"shopping"},
		{"habrfun": 5, "category":"it"},
		{"robotzaimet": -5, "category":"dolg"},
		{"holidayclubresorts": 5, "category":"travel"},
		{"ugol.remont": 5},
		{"muchmoneyapp": -2},
		{"dokhodchivo": 5}

		]"""



    # attr2 = "dog"
	def __init__(self):
		self.weights_photo_tagsD = json.loads(self.weights_photo_tags)
		self.weights_groupsD = json.loads(self.weights_groups)
	def getWeightsPhotoTags(self):
		return self.weights_photo_tagsD
	def getWeightsGroupsD(self):
		return self.weights_groupsD
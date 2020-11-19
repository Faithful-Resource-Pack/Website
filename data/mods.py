import json
import os

final_data = []

with open('mods.json') as f:
	data = json.load(f)

	for p in range(0,len(data)):

		name = data[p]['name'][0]
		curse = data[p]['name'][2]

		# assets part:
		assets = {}
		for x in range(0,len(data[p]['versions'])):
			version = data[p]['versions'][x]
			assets[f'{version}'] = data[p]['name'][1]

		if curse != 'none':
			mod = { 'name': [ name ], 'assets': assets, 'curse': curse }
		else:
			mod = { 'name': [ name ], 'assets': assets}
		final_data.append(mod)

with open('mods2.json', 'w') as f:
	json.dump(final_data, f, indent=2)
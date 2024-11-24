import json
import os

final_data = []

with open('mods.json') as f:
	data = json.load(f)

	for p in range(0, len(data)):
		name = data[p]['name'][0]
		assets = data[p]['name'][1]
		curse = data[p]['name'][2]
		versions = data[p]['versions']

		if curse != 'none':
			mod = { 'name': { 'displayName': name, 'aliases': [] }, 'versions': versions, 'curse': curse, 'orgRepo': assets }
		else:
			mod = { 'name': { 'displayName': name, 'aliases': [] }, 'versions': versions, 'orgRepo': assets }
		final_data.append(mod)

with open('modsNEW.json', 'w') as f:
	json.dump(final_data, f, indent=2)
import requests, json, pprint

def getPlace(keyword, api_key):
    url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
    payload = { 'key': api_key, 'query': ('구래동 ' + keyword.strip()).replace(' ', '+') }
    data = json.loads(requests.get(url, params=payload).text)['results']
    result = []
    for place in data:
        this = {
            'name' : place['name'],
            'location' : place['geometry']['location'],
            'address' : place['formatted_address']
        }
        if (this['name'] != 'Gurae-dong') and ('Gurae-dong' in this['address']):
            pprint.pprint(this)
            if this not in result:
                result.append(this)
    return result

if __name__ == '__main__':
    config = json.loads(open('config.json').read())
    api_key = config['api_key']
    keywords = config['keywords']
    results = []
    for keyword in keywords:
        print('[*]', keyword)
        results += getPlace(keyword, api_key)
    with open('places.json', 'w') as file:
        json.dump(results, file, indent=4, sort_keys=True, ensure_ascii=False)

import urllib.request
import re
import json

url = 'https://www.pinterest.com/pin/1151725304741455340/'
req = urllib.request.Request(
    url,
    headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
)

with urllib.request.urlopen(req) as response:
    content = response.read().decode('utf-8', errors='ignore')

videos = re.findall(r'https://v\.pinimg\.com/[^"\'\s<>]+', content)
print("Video URLs found:", set(videos))

match = re.search(r'<script id="__PWS_DATA__" type="application/json">(.*?)</script>', content)
if match:
    data = json.loads(match.group(1))
    
    # Save the json to a file so we can inspect
    with open("pin_data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print("Saved pin_data.json!")

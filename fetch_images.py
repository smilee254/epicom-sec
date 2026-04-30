import urllib.request
import re
import ssl
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_image(query, filename):
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        html = urllib.request.urlopen(req, context=ctx).read()
        soup = BeautifulSoup(html, 'html.parser')
        for a in soup.find_all('a', class_='imageResult'):
            img_url = a.get('href')
            # Extract actual image url from duckduckgo redirect
            match = re.search(r'vudd=([^&]+)', img_url)
            if match:
                actual_url = urllib.parse.unquote(match.group(1))
                print(f"Downloading {actual_url} for {query}")
                urllib.request.urlretrieve(actual_url, f"assets/{filename}")
                return True
    except Exception as e:
        print(f"Failed for {query}: {e}")
    return False

queries = {
    "Centurion D3 Smart Gate Motor high resolution product": "gate.png",
    "Nemtek Electric Fencing hardware high resolution": "electric-fence.png",
    "Ajax Smart Alarm Keypad black": "alarm-keypad.png",
    "Motorized Smart Curtains interior": "smart-curtains.png",
    "Monocrystalline Solar Panels black": "solar-panels.png",
    "Yealink IP Business Phone high resolution": "ip-phone.png"
}

for q, f in queries.items():
    fetch_image(q, f)


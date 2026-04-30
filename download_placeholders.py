import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    "alarm.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Intruder_alarm_keypad.JPG/800px-Intruder_alarm_keypad.JPG",
    "fence.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Electric_fence_insulator.jpg/800px-Electric_fence_insulator.jpg",
    "curtains.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Window_Blinds.jpg/800px-Window_Blinds.jpg",
    "solar.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Solar_panels_on_the_roof_of_a_house.jpg/800px-Solar_panels_on_the_roof_of_a_house.jpg",
    "phone.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/VoIP-Phone-Yealink-SIP-T20P.jpg/800px-VoIP-Phone-Yealink-SIP-T20P.jpg"
}

for name, url in urls.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        data = urllib.request.urlopen(req, context=ctx).read()
        with open(f"/home/smilee/epicom-sec/assets/{name}", "wb") as f:
            f.write(data)
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed {name}: {e}")

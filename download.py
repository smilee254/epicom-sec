import urllib.request
import ssl
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    "alarm.jpg": "https://www.credexalarmsystems.eu/media/catalog/product/cache/7f19810578672521f7c503b41d2f8e17/k/e/keypad-black-1.jpg",
    "fence.jpg": "https://www.nemtek.co.za/wp-content/uploads/2022/02/P1000136-min-scaled.jpg",
    "solar.jpg": "https://www.maysunsolar.com/wp-content/uploads/2023/10/Cover-Image-5.jpg",
    "phone.png": "https://www.yealink.com/website-service/attachment/product/image/20220412/20220412034349443d8bcd4f040858e42a684b29c6bf0.png"
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

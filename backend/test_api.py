import urllib.request
import urllib.error

try:
    response = urllib.request.urlopen('http://127.0.0.1:5000/get-expenses?user_id=1')
    print(response.read())
except urllib.error.HTTPError as e:
    print(e.read())

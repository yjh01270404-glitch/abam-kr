import requests
import json

email = "yjh01270404@gmail.com"
password = "CloudflareResetPass987!@#"

headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

url = "https://dash.cloudflare.com/api/v4/login"
payload = {
    "email": email,
    "password": password
}

try:
    r = requests.post(url, json=payload, headers=headers)
    print("Status:", r.status_code)
    print("Response:", r.text[:300])
except Exception as e:
    print("Error:", e)

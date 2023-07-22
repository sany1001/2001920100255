from fastapi import FastAPI,Path
from pydantic import BaseModel
from typing import Optional
import requests
from datetime import datetime as d
import json

def operation(data):
    return sorted(data,key=lambda i:(i['price']['sleeper'],i['price']['AC'],-1*i['seatsAvailable']['sleeper'],-1*i['seatsAvailable']['AC'],-1*i['departureTime']['Hours']))

auth="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAwNDYxNTYsImNvbXBhbnlOYW1lIjoiQWZmb3JkTWVkIiwiY2xpZW50SUQiOiJhNmIyM2Y0Zi1kNTk5LTRmYzgtYWVjMi03YmJlNDBkNGY4NGIiLCJvd25lck5hbWUiOiIiLCJvd25lckVtYWlsIjoiIiwicm9sbE5vIjoiMjAwMTkyMDEwMDI1NSJ9.LWqqXWcb5lRs5KTAgaEU_wKZBKcvJ8YTT1Z9aE-lM-E"
hed={'Authorization': 'Bearer '+auth}
data=[]
response=requests.get("http://20.244.56.144/train/trains",headers=hed)
if response.status_code==200:
    data=response.json()

if len(data)!=0:
    data=operation(data)

app = FastAPI()

@app.get("/trains")
def trains():
    return data
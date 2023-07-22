from fastapi import FastAPI,Path
from pydantic import BaseModel
from typing import Optional
import requests
from datetime import datetime as d
import json
from fastapi.middleware.cors import CORSMiddleware


pstBody={
    "companyName": "AffordMed",
    "clientId":"a6b23f4f-d599-4fc8-aec2-7bbe40d4f84b",
    "ownerName":"Sanskar Dhingra",
    "ownerEmail":"cs20227@glbitm.ac.in",
    "rollNo":"2001920100255",
    "clientSecret":"BDrWMYZTPdmDAVCu"
}
resp1=requests.post(url="http://20.244.56.144/train/auth",json=pstBody)
auth=resp1.json()["access_token"]

hed={'Authorization': 'Bearer '+auth}
data=[]
response=requests.get("http://20.244.56.144/train/trains",headers=hed)
if response.status_code==200:
    data=response.json()

def operation(data):
    return sorted(data,key=lambda i:(i['price']['sleeper'],i['price']['AC'],-1*i['seatsAvailable']['sleeper'],-1*i['seatsAvailable']['AC'],-1*i['departureTime']['Hours']))

if len(data)!=0:
    data=operation(data)

app = FastAPI()


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/trains")
def trains():
    return data

@app.get("/trains/{id}")
def trains(id:str):
    for dt in data:
        if dt['trainNumber']==id:
            return dt
    return {"message":"not found"}
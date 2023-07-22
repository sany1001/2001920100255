import requests
pstBody={
    "companyName": "AffordMed",
    "clientId":"a6b23f4f-d599-4fc8-aec2-7bbe40d4f84b",
    "ownerName":"Sanskar Dhingra",
    "ownerEmail":"cs20227@glbitm.ac.in",
    "rollNo":"2001920100255",
    "clientSecret":"BDrWMYZTPdmDAVCu"
}
resp1=requests.post(url="http://20.244.56.144/train/auth",json=pstBody)
resp=resp1.json()
print(resp['access_token'])
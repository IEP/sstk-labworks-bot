# External Folder

This folder is supposed to be used with Docker (planned). You supposed to create
two subfolder inside this folder, `credentials` and `downloads` (`downloads` 
folder will be automatically created).

The content of this folder will be as follows:
```
.
├── credentials
│   ├── lab-sstk-admin.json
│   ├── lab-sstk-web.json
│   ├── private.key
│   └── public.pem
├── downloads
└── README.md
```

`*-admin.json` and `*-web.json` can be obtained by using Firebase.

`lab-sstk-admin.json` (Firebase Admin):
```
{
  "type": "service_account",
  "project_id": "XXX",
  "private_key_id": "XXX",
  "private_key": "XXX",
  "client_email": "XXX",
  "client_id": "XXX",
  "auth_uri": "XXX",
  "token_uri": "XXX",
  "auth_provider_x509_cert_url": "XXX",
  "client_x509_cert_url": "XXX"
}
```

`lab-sstk-web.json`
```
{
  "apiKey": "XXX",
  "authDomain": "XXX",
  "databaseURL": "XXX",
  "projectId": "XXX",
  "storageBucket": "XXX",
  "messagingSenderId": "XXX",
  "appId": "XXX",
  "measurementId": "XXX"
}
```
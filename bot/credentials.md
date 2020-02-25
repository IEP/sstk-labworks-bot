# Credentials

Create `credentials` folder.

## Firebase Web Apps

1. Create Web apps at Firebase Console > Project Settings.
2. Copy the Firebase SDK snippet config to `credentials/lab-sstk-web.js`.
3. add `module.exports = firebaseConfig` at the bottom of the file

```javascript
// bot/credentials/lab-sstk-web.js

const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX.firebaseio.com",
  databaseURL: "https://XXX.firebaseio.com",
  projectId: "XXX",
  storageBucket: "XXX.appspot.com",
  messagingSenderId: "XXX",
  appId: "XXX",
  measurementId: "XXX"
}

module.exports = firebaseConfig
```

## Firebase Admin

1. Go to Firebase Console > Project Settings > Service accounts.
2. Click "Generate new private key".
3. Save the file into `credentials/lab-sstk.admin.json`.
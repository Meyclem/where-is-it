# Create SSR firebase app

## Inspiration
- https://medium.com/swlh/lets-create-blog-app-with-next-js-react-hooks-and-firebase-backend-tutorial-7ce6fd7bbb3a

## Go go Firebase and configure new project

- credentials
- json to env variables with NextJs (`NEXT_PUBLIC` prefix)

### Service Account

- https://console.cloud.google.com/iam-admin/serviceaccounts/project?project=cetoikila&authuser=0&pli=1

## Dependencies

- firebase
- firebase-admin

## firebase client

```ts
import firebaseClient from "firebase/app";
import "firebase/auth";

if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
}

export { firebaseClient };
```


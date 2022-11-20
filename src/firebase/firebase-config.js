import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB-NO5U5D76ePoo3KjiiK-2fQy1gQ_WDoM",
  authDomain: "narisha-jewels-48e83.firebaseapp.com",
  projectId: "narisha-jewels-48e83",
  storageBucket: "narisha-jewels-48e83.appspot.com",
  messagingSenderId: "949397738423",
  appId: "1:949397738423:web:c22aa5970583ba4beb0e32",
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);

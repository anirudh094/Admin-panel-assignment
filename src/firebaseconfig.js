import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyCHZ1g-7jUOVzq4-_W9MFBZxyhYmYjCyjU",
    authDomain: "react01-9666b.firebaseapp.com",
    databaseURL: "https://react01-9666b-default-rtdb.firebaseio.com",
    projectId: "react01-9666b",
    storageBucket: "react01-9666b.appspot.com",
    messagingSenderId: "594389098469",
    appId: "1:594389098469:web:c19796184f235b4678590c",
  };
  const app = initializeApp(firebaseConfig);

  return getDatabase(app);
}

export default StartFirebase;

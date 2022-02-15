

//firebase setup
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAL97XIihJBRL_E_KG5KFdx6z0vDTr_DrA",
  authDomain: "listiee-assignment-d5be0.firebaseapp.com",
  projectId: "listiee-assignment-d5be0",
  storageBucket: "listiee-assignment-d5be0.appspot.com",
  messagingSenderId: "515954241107",
  appId: "1:515954241107:web:e45c8761333c3c1d34a0a6"
};

const app = initializeApp(firebaseConfig);

export default app;
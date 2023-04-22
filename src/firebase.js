import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBfYzAhFaWJ1NDEI3wKdlufW80gWJlbzj4",
    authDomain: "loginpage-fe9eb.firebaseapp.com",
    projectId: "loginpage-fe9eb",
    storageBucket: "loginpage-fe9eb.appspot.com",
    messagingSenderId: "407677229279",
    appId: "1:407677229279:web:fe1343f8becc67b193b16a",
    measurementId: "G-M5QSWY8KTJ"
};
const app=initializeApp(firebaseConfig);
const auth=getAuth(app)
export default auth
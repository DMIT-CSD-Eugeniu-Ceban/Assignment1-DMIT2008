import { ref as databaseRef, remove, set, get, } from 'firebase/database';
import { db, storage } from "./libs/firebase/firebaseConfig";


function pageInit() {
    const key = sessionStorage.getItem('key')
    const path = `products/${key}`
    console.log(path)
}

pageInit()
import { ref as databaseRef, remove, set, get, } from 'firebase/database';
import { db, storage } from "./libs/firebase/firebaseConfig";

async function deleteCard() {
    const key = sessionStorage.getItem('key')
    const path = `products/${key}`

    const dataRef = await databaseRef(db, path)
    remove(dataRef);

}

export { deleteCard}

import { ref as dataRef, get } from 'firebase/database';
import { db } from './libs/firebase/firebaseConfig';
import { productCard } from './templates/productCard';


async function pageInit() {
    const productRef = dataRef(db, 'products/');
    const productSnapShot = await get(productRef)
    const data = productSnapShot.val();


    Object.values(data).map(product => {
        const card = productCard(product)
        document.querySelector("div#show-cards").append(card)
        return card
    })
}

pageInit()
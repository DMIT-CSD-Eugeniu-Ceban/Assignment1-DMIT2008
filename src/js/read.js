import { ref as dataRef, get, set, update } from 'firebase/database';
import { db } from './libs/firebase/firebaseConfig';
import { productCard } from './templates/productCard';

async function pageInit() {
    const productRef = dataRef(db, 'products/');
    const productSnapShot = await get(productRef)
    const data = productSnapShot.val();

    // document.body.append(productCard())
    document.querySelector("div#content").append(productCard())

    /* Object.values(data).map(rental => {
        const card = rentalCard(rental)
        document.body.append(card)
        return card
    }) */

}

pageInit()
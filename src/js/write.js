import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, push, set } from 'firebase/database';
import { db, storage } from "./libs/firebase/firebaseConfig";


document.querySelector("#productImage").addEventListener("change", onImageSelected);
document.forms["cardForm"].addEventListener("submit", onAddProduct);


function onAddProduct(e) { 
    e.preventDefault();
    uploadNewProduct();
}

function onImageSelected(e) {
    let file = e.target.files[0];

    document.querySelector(".image img").src = URL.createObjectURL(file);
}

async function uploadNewProduct() {
    // Card data
    const file = document.querySelector('#productImage').files[0];
    const type = document.querySelector('#shoesType').value.trim();
    const name = document.querySelector('#shoesName').value.trim();
    const message = document.querySelector('#message').value.trim();
    const price = document.querySelector('#shoesPrice').value.trim();
    
    // Write data to the Firebase
    const dataRef = databaseRef(db, 'products')
    const itemRef = await push(dataRef)
    const sku = `ecsp${itemRef.key}`
    const imageRef = storageRef(storage, `product-images/${sku}`);

    const uploadResult = await uploadBytes(imageRef, file);
    const urlPath = await getDownloadURL(imageRef)
    const imagePath = uploadResult.metadata.fullPath;


    // firebase unique key

    set(itemRef, {
        key: itemRef.key,
        sku,
        urlPath,
        imagePath,
        type,
        name,
        message,
        price
        /* size: [5, 6, 7, 8, 9, 10, 11, 12] */
    })

}

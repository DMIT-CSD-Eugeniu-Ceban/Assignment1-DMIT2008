import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, push, set, get, remove } from 'firebase/database';
import { db, storage } from "./libs/firebase/firebaseConfig";



document.querySelector("#cardForm").addEventListener("change", onImageSelected);
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
    const imageRef = storageRef(storage, `product-images/${file.name}`);
    const dataRef = databaseRef(db, 'products')

    const uploadResult = await uploadBytes(imageRef, file);
    const urlPath = await getDownloadURL(imageRef)
    const storagePath = uploadResult.metadata.fullPath;

    // firebase unique key
    const itemRef = await push(dataRef)

    set(itemRef, {
        key: itemRef.key,
        sku: `ecsp${itemRef.key}`,
        urlPath,
        storagePath,
        type,
        name,
        message,
        price  
        /* size:[8, 8.5, 9 ,9.5] */
    })

}

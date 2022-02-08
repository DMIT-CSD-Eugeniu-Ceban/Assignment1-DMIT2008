import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, set, get, } from 'firebase/database';
import { db, storage } from "./libs/firebase/firebaseConfig";

const cardForm = document.forms['cardForm']

async function pageInit() {
    const key = sessionStorage.getItem('key');
    const productRef = databaseRef(db, `products/${key}`)
    const productSnapShot = await get(productRef)

    if (productSnapShot.exists()) {
        setFieldValues(productSnapShot.val())
    }

    cardForm.addEventListener('submit', onUpdateProduct)

}

function onUpdateProduct(e) {
    e.preventDefault();
    updateProductData()
}


function setFieldValues({ urlPath, type, name, message, price }) {
    document.querySelector('.image img').src = urlPath
    cardForm.elements['shoesType'].value = type
    cardForm.elements['shoesName'].value = name
    cardForm.elements['shoesPrice'].value = price
    cardForm.elements['message'].value = message
}


async function updateProductData() {
    const file = cardForm.elements['productImage'].files;
    const type = cardForm.elements['shoesType'].value.trim();
    const name = cardForm.elements['shoesName'].value.trim();
    const price = cardForm.elements['shoesPrice'].value.trim();
    const message = cardForm.elements['message'].value.trim();


    if (file.lenght !== 0) {
        const imageRef = storageRef(storage, `product-images/${file.name}`)
        const uploadResult = await uploadBytes(imageRef, file);
        const imagePath = uploadResult.metadata.fullPath;
        console.log(imagePath)
    } 
    const urlPath = await getDownloadURL(imageRef);


    const key = sessionStorage.getItem('key');
    const dataRef = databaseRef(db, `products/${key}`)
    
    set(dataRef, {
        key,
        urlPath,
        message,
        name,
        price,
        type,
        imagePath
    })
}

pageInit()
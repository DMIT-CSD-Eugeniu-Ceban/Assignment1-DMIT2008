import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, set, get, } from 'firebase/database';
import { db, storage } from "./libs/firebase/firebaseConfig";

const cardForm = document.forms['cardForm']
const key = sessionStorage.getItem('key');
let productInfo;

document.querySelector('#productImage').addEventListener("change", onImageSelected);

async function pageInit() {
    const productRef = databaseRef(db, `products/${key}`)
    const productSnapShot = await get(productRef)

    if (productSnapShot.exists()) {
        productInfo = productSnapShot.val()
        setFieldValues(productInfo)
    }
    cardForm.addEventListener('submit', onUpdateProduct)
}

function onUpdateProduct(e) {
    e.preventDefault();
    updateProductData()
}

function onImageSelected(e) {
    let file = e.target.files[0];
    console.log(file)
    document.querySelector(".image img").src = URL.createObjectURL(file);
}

function setFieldValues({ urlPath, type, name, message, price }) {
    document.querySelector('.image img').src = urlPath
    cardForm.elements['shoesType'].value = type
    cardForm.elements['shoesName'].value = name
    cardForm.elements['shoesPrice'].value = price
    cardForm.elements['message'].value = message
}

async function updateProductData() {
    const sku = productInfo.sku
    const type = cardForm.elements['shoesType'].value.trim();
    const name = cardForm.elements['shoesName'].value.trim();
    const price = cardForm.elements['shoesPrice'].value.trim();
    const message = cardForm.elements['message'].value.trim();
    let imagePath = productInfo.imagePath;
    let urlPath = productInfo.urlPath;

    const file = cardForm.elements['productImage'].files[0];


    if (file.length !== 0) {
        const imageRef = storageRef(storage, `product-images/${sku}`)
        const uploadResult = await uploadBytes(imageRef, file);
        imagePath = uploadResult.metadata.fullPath;
        urlPath = await getDownloadURL(imageRef);
        console.log("Test");
    }
    

    const dataRef = databaseRef(db, `products/${key}`)
    set(dataRef, {
        key,
        sku,
        urlPath,
        message,
        name,
        price,
        type,
        imagePath
    })
}

pageInit()



import { ref as databaseRef, remove, set, get, } from 'firebase/database';
import { db, storage } from "../libs/firebase/firebaseConfig";


function productCard({ key, urlPath, type, name, message, price }) {
	const template = `
        <form id="cardForm" class="container">
				<div class="images">
					<img src="${urlPath}" alt="Product image"/>
				</div>
				<div class="sizeFlex">
					<p class="pick">choose size</p>
				</div>
				<div class="sizes">
					<div class="size">5</div>
					<div class="size">6</div>
					<div class="size">7</div>
					<div class="size">8</div>
					<div class="size">9</div>
					<div class="size">10</div>
					<div class="size">11</div>
					<div class="size">12</div>
				</div>
				<div class="product">
					<p>${type}</p>
					<h1>${name}</h1>
					<h2>\$${price}</h2>
					<p class="desc">${message}</p>
					<div class="buttons">
						<button id="edit" data-key="${key}" class="add">Update Product</button>
						<button id="delete" data-key="${key}" class="like">Delete Product</button>
					</div>
				</div>
			</form>
    `
	const element = document.createRange().createContextualFragment(template).children[0]
	addControlToCard(element)
	return element
}

function addControlToCard(product) {
	product.querySelector('#edit').addEventListener('click', onEditProduct)
	product.querySelector('#delete').addEventListener('click', onRemoveProduct)
}

function onEditProduct(e) {
	e.preventDefault();
	const key = e.target.dataset.key
	sessionStorage.setItem('key', key)
	window.location.assign('update.html')
}

async function onRemoveProduct(e) {
	e.preventDefault();
	/* const key = e.target.dataset.key
	sessionStorage.setItem('key', key)
	window.location.assign('delete.html') */
	const key = e.currentTarget.dataset.key
	const path = `products/${key}`

	if (confirm(key)) {
		const dataRef = await databaseRef(db, path)
		remove(dataRef);
	} else {
		window.location.assign('index.html')
	}
}

export { productCard }


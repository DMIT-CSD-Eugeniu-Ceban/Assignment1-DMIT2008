function productCard(data) {
	const template = `
        <form id="cardForm" class="container">
				<div class="images">
					<img src="static/images/Shoses/Nike2.jpg" />
				</div>
				<div class="sizeFlex">
					<p class="pick">choose size</p>
					<div class="addImage">
						<label for="rentalImage">Select image </label>
						<input type="file" id="rentalImage" style="display:none" class="select-file"
							accept=".jpg, .png, .jpeg, .webp">
					</div>
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
					<p>Women's Running Shoe</p>
					<h1>Nike Epic React Flyknit</h1>
					<h2>$150</h2>
					<p class="desc">The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable
						yet soft.
						This creates a sensation that not only enhances the feeling of moving forward, but makes running
						feel fun,
						too.</p>
					<div class="buttons">
						<button id="edit" class="add">Edit Product</button>
						<button id="delete" class="like">Delete Product</button>
					</div>
				</div>
			</form>
    `
	const element = document.createRange().createContextualFragment(template).children[0]
	return element
}

export { productCard }
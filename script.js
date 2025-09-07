const treeShowcaseWrapper = document.getElementById('tree-showcase-wrapper');
const categoriesWrapper = document.getElementById('categories-wrapper');

    const cartItemWrapper = document.getElementById('cart-item-wrapper');

const getData = async url => {
    const result = await fetch(url);
    return result.json();
}

const getCategory = () => {
    getData('https://openapi.programming-hero.com/api/categories')
    .then(categories => showCategory(categories.categories));
}

const showCategory = categories => {
    categories.forEach(category => {
        const {id, category_name: title} = category;
        const div = document.createElement('div');
        div.classList.add('category-label')
        div.innerHTML = `<li onclick="getAllTrees('https://openapi.programming-hero.com/api/category/${id}')" class="category-li text-base cursor-pointer p-2">${title}</li>`;
        categoriesWrapper.appendChild(div);
    });
}

const getAllTrees = (url) => {
    getData(url)
    .then(plants =>{
         showAllTrees(plants.plants);
    });


}

const showAllTrees = plants => {
    treeShowcaseWrapper.innerHTML = '';
    plants.forEach(plant => {
        const {id, image, name, description, category, price} = plant;
        const shortDescription = description.split(' ').slice(0, 14).join(' ');

        treeShowcaseWrapper.innerHTML += `
            <div class="tree-showcase-item bg-white p-4 rounded-lg h-max">
                <img class="w-full h-[185px] rounded-lg object-cover" src="${image}" alt="${name}">
                <h5 onclick="showTreeDetails(${id})" class="tree-title text-sm font-semibold text-[#1f2937] mt-3 mb-2 cursor-pointer">${name}</h5>
                <p class="text-xs text-[#1f2937] opacity-80">${shortDescription}</p>
                <div class="tree-item-category flex justify-between mt-2 mb-3">
                    <p class="text-sm bg-[#dcfce7] py-1 px-2 rounded-full text-[#15803D] font-medium">${category}</p>
                    <p class="text-sm font-semibold">৳<span class="tree-price">${price}</span></p>
                </div>
                <button onclick="calculateCartTotals(this, ${id})" id="add-to-cart-btn-${id}" class="p-3 w-full block text-center bg-[#15803d] text-white text-base rounded-full font-medium cursor-pointer">Add to Cart</button>
            </div>
        `
    });
}

const showTreeDetails = id => {
    const treeDetailsModal = document.getElementById('tree_details_modal');
    const modalContainer = document.getElementById('modal-container');
    treeDetailsModal.showModal();

    getData(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(plant => {
        const {id, image, name, description, category, price} = plant.plants;
        modalContainer.innerHTML = `
            <div class="tree-showcase-item">
                <img class="w-full h-[400px] rounded-lg object-cover" src="${image}" alt="${name}">
                <h5 class="text-sm font-semibold text-[#1f2937] mt-3 mb-2 cursor-pointer">${name}</h5>
                <p class="text-xs text-[#1f2937] opacity-80">${description}</p>
                <div class="tree-item-category flex justify-between mt-2 mb-3">
                    <p class="text-sm bg-[#dcfce7] py-1 px-2 rounded-full text-[#15803D] font-medium">${category}</p>
                    <p class="text-sm font-semibold">৳<span class="tree-price">${price}</span></p>
                </div>
            </div>
        `
    });
}

const removeActive = () => {
    const categoryLI = document.querySelectorAll('.category-li');
    categoryLI.forEach(items => {
        items.classList.remove('active');
    });

}

const showActive = () => {
    categoriesWrapper.addEventListener('click', (e) => {
        if(e.target.tagName === 'LI') {
            removeActive();
            e.target.classList.add('active');
        }
    })
}


let totalPrice = 0;

const cartTotalWrapper = document.getElementById('cart-total-wrapper');
cartItemWrapper.addEventListener('click', (e) => {
    if(e.target.id === 'cross-icon') {
        e.target.parentNode.parentNode.remove();
        const removedItemPrice = e.target.parentNode.parentNode.querySelector('.cart-item-details-price').innerText;
        totalPrice -= parseInt(removedItemPrice);
        isDisplayTotal();
    }
});

const calculateCartTotals = (target, id) => {
    let itemCount = 1;

    const treeTitle = target.parentNode.querySelector('.tree-title');
    const treePrice = target.parentNode.querySelector('.tree-price');

    alert(`${treeTitle.innerText} added to the cart`);

    cartItemWrapper.innerHTML += `
        <div class="cart-item flex justify-between items-center bg-[#f0fdf4] py-2 px-3 mt-2">
            <div class="cart-item-details">
                <h5 class="text-sm font-semibold text-[#1f2937]">${treeTitle.innerText}</h5>
                <p class="text-[#1f2937] opacity-50 text-base">৳<span class="cart-item-details-price">${treePrice.innerText}</span> x <span class="cart-item-details-quantity">${itemCount}</span></p>
            </div>
            <div class="cursor-pointer">
                <img id="cross-icon" src="./assets/close.png" alt="Close">
            </div>
        </div>
    `
    totalPrice += parseInt(treePrice.innerText);
    isDisplayTotal();
}

const isDisplayTotal = () => {
    const cartItems = document.getElementsByClassName('cart-item');

    if(cartItems.length > 0) {
        cartTotalWrapper.classList.remove('hidden');
        cartTotalWrapper.innerHTML = `
            <p>Total:</p>
            <p>৳<span class="total-price">${totalPrice}</span></p>
        `
    } else {
        cartTotalWrapper.classList.add('hidden');
    }
}



showActive();
getCategory();
getAllTrees('https://openapi.programming-hero.com/api/plants');
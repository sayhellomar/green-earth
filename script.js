const treeShowcaseWrapper = document.getElementById('tree-showcase-wrapper');
const categoriesWrapper = document.getElementById('categories-wrapper');

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
                <h5 class="text-sm font-semibold text-[#1f2937] mt-3 mb-2 cursor-pointer">${name}</h5>
                <p class="text-xs text-[#1f2937] opacity-80">${shortDescription}</p>
                <div class="tree-item-category flex justify-between mt-2 mb-3">
                    <p class="text-sm bg-[#dcfce7] py-1 px-2 rounded-full text-[#15803D] font-medium">${category}</p>
                    <p class="text-sm font-semibold">৳<span class="tree-price">${price}</span></p>
                </div>
                <a href="#" class="add-to-cart-btn p-3 w-full block text-center bg-[#15803d] text-white text-base rounded-full font-medium">Add to Cart</a>
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

showActive();
getCategory();
getAllTrees('https://openapi.programming-hero.com/api/plants');
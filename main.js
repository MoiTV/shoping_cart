const user = {
    name: 'Moi',
    active: true,
    cart: [],
    purchases: []
}

const compose = (f, g) => (...args) => f(g(...args));

function purchaseItem(...fns) {
    fns.reduce(compose)
}

console.log(purchaseItem(emptyCart, buyItem, applyTaxToItems, addItemToCart)(user, { name: 'laptop', price: 1300 }));



function addItemToCart() {}

function applyTaxToItems() {}

function buyItem() {}

function emptyCart() {}
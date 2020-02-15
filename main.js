const user = {
    name: 'Moi',
    active: true,
    cart: [],
    purchases: []
}

const compose = (f, g) => (...args) => f(g(...args));

function purchaseItem(...fns) {
    return fns.reduce(compose)
}

console.log(purchaseItem(emptyCart, buyItem, applyTaxToItems, addItemToCart)(user, { name: 'laptop', price: 1500 }));



function addItemToCart(user, item) {
    const updateCart = user.cart.concat(item)
    return Object.assign({}, user, { cart: updateCart });
}

function applyTaxToItems(user) {
    const { cart } = user;
    const taxRate = 1.0725;
    const updateCart = cart.map(item => {
        return {
            name: item.name,
            price: item.price * taxRate
        }
    })

    return Object.assign({}, user, { cart: updateCart })
}

function buyItem(user) {
    return Object.assign({}, user, { purchases: user.cart });
}

function emptyCart(user) {
    return Object.assign({}, user, { cart: [] });
}
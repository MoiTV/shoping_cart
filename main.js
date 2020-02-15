const user = {
    name: 'Moi',
    active: true,
    cart: [],
    purchases: []
}
let history = [];
const compose = (f, g) => (...args) => f(g(...args));

function purchaseItem(...fns) {
    return fns.reduce(compose)
}

console.log(purchaseItem(emptyCart, buyItem, applyTaxToItems, addItemToCart)(user, { name: 'laptop', price: 1500 }));



function addItemToCart(user, item) {
    history.push(user);
    const updateCart = user.cart.concat(item)
    return Object.assign({}, user, { cart: updateCart });
}

function applyTaxToItems(user) {
    history.push(user);

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
    history.push(user);

    return Object.assign({}, user, { purchases: user.cart });
}

function emptyCart(user) {
    history.push(user);

    return Object.assign({}, user, { cart: [] });
}

function refundItem() {

}

console.log(history)
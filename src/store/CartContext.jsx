import { createContext, useReducer } from "react";

const CartContext = createContext({
    products: [],
    addProduct: (product) => { },
    removeProduct: (id) => { },
    clearCart: () => { }
});

function cartManagment(state, action) {
    if (action.type === 'ADD_PRODUCT') {
        const existingCartProductIndex = state.products.findIndex((product) => product.id === action.product.id);
        const updatedProducts = [...state.products];
        if (existingCartProductIndex > -1) {
            const existingProduct = state.products[existingCartProductIndex];
            const updatedProduct = {
                ...existingProduct,
                cart_quantity: existingProduct.cart_quantity + 1
            };
            updatedProducts[existingCartProductIndex] = updatedProduct;
        } else {
            updatedProducts.push({ ...action.product, cart_quantity: 1 });
        }

        return { ...state, products: updatedProducts };
    }

    if (action.type === 'REMOVE_PRODUCT') {
        const existingCartProductIndex = state.products.findIndex((product) => product.id === action.id);
        const existingCartProduct = state.products[existingCartProductIndex];
        const updatedProducts = [...state.products];
        if (existingCartProduct.cart_quantity === 1) {
            updatedProducts.splice(existingCartProductIndex, 1);
        } else {
            const updatedProduct = {
                ...existingCartProduct,
                cart_quantity: existingCartProduct.cart_quantity - 1
            };
            updatedProducts[existingCartProductIndex] = updatedProduct;
        }

        return { ...state, products: updatedProducts };
    }

    if (action.type === 'CLEAR_CART') {
        return {...state, products: []};
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartManagment, { products: [] });

    function addProduct(product) {
        dispatchCartAction({ type: 'ADD_PRODUCT', product })
    }

    function removeProduct(id) {
        dispatchCartAction({ type: 'REMOVE_PRODUCT', id })
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' })
    }

    const cartContext = {
        products: cart.products,
        addProduct,
        removeProduct,
        clearCart
    }

    return (
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    )
}

export default CartContext;
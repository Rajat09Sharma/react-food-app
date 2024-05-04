import { createContext, useReducer } from "react";
import { rupeeCurrency } from "../util/currency";
import { act } from "react";

export const CartContext = createContext({
    items: [],
    addItem: () => { },
    removeItem: () => {},
    clearCart:()=>{}
});

function cartReducer(state, action) {

    if (action.type === "ADD_ITEM") {
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload.id);
        const existingCartItem = updatedItems[existingCartItemIndex];
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                quantity: 1
            })
        }
        return { items: [...updatedItems] }
    }

    if (action.type === "REMOVE_ITEM") {
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload.id);
        const existingCartItem = updatedItems[existingCartItemIndex];
        if (existingCartItem.quantity > 1) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        }
        return { items: [...updatedItems] }
    }

    if(action.type==="CLEAR_CART"){
        return {...state,items:[]}
    }

}


export default function CartContextProvider({ children }) {
    const [meals, dispatchMealsState] = useReducer(cartReducer, { items: [] });

    function addItem(meal) {
        dispatchMealsState({
            type: "ADD_ITEM",
            payload: {
                id: meal.id,
                name: meal.name,
                price: rupeeCurrency(meal.price)
            }
        });
    }

    function removeItem(id) {
        dispatchMealsState({
            type: "REMOVE_ITEM",
            payload: { id }
        });
    }

    function clearCart(){
        dispatchMealsState({
            type:"CLEAR_CART"
        });
    }

    const cartCtx = {
        items: meals.items,
        addItem: addItem,
        removeItem: removeItem,
        clearCart
    }

    return <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
}

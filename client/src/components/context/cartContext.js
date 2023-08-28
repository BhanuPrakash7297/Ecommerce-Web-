

import { createContext, useState, useContext, useEffect } from "react";


const CartContext = createContext();



const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let cartItem = localStorage.getItem('cart');
        if (cartItem) setCart(JSON.parse(cartItem));
    }, []);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}


const useCart = () => useContext(CartContext);
export { useCart, CartProvider };



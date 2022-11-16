import React from 'react'

import CartItem from '../CartItem/CartItem';

// Types
import { CartItemType } from '../../App';

// Styles
import { Wrapper } from './Cart.styles';

type CartProps = {
    items: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void
}

const Cart: React.FC<CartProps> = ({items, addToCart, removeFromCart}) => {

    const calculateTotal = (items: CartItemType[]) => items.reduce((acumulator: number, item) => acumulator + item.amount * item.price, 0);
    
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {items.length === 0 ? <p>No items in cart.</p> : null}

            {items.map((item: CartItemType) => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}

            <h2>Total: ${calculateTotal(items).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart
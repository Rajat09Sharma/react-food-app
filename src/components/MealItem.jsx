import React, { useContext } from 'react'
import { CartContext } from '../store/cart-context';
import { rupeeCurrency } from '../util/currency';

export default function MealItem({ meal }) {
    const { addItem } = useContext(CartContext);

    function handleClick() {
        addItem(meal);
    }

    const rupee = rupeeCurrency(meal.price);

    return (
        <div className='meal-item'>
            <article>
                <img src={`http://localhost:3000/${meal.image}`} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className='meal-item-price'>₹{rupee}</p>
                    <p className='meal-item-description'>{meal.description}</p>
                </div>
                <p className='meal-item-actions'>
                    <button className='button ' onClick={handleClick}>Add to cart</button>
                </p>
            </article>
        </div>
    )
}

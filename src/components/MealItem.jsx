import React, { useContext } from 'react'
import { CartContext } from '../store/cart-context';
import { rupeeCurrency } from '../util/currency';
import { BASE_URL } from './helper';

export default function MealItem({ meal }) {
    const { addItem } = useContext(CartContext);

    function handleClick() {
        addItem(meal);
    }

    const rupee = rupeeCurrency(meal.price);

    return (
        <div className='meal-item'>
            <article>
                <img src={`${BASE_URL}/${meal.image}`} />
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

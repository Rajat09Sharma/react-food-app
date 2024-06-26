
import MealItem from './MealItem'
import { useHttp } from '../hook/useHttp'
import Error from './Error';
import { BASE_URL } from './helper';

const config = {};

export default function Product() {
    const { isLoading, error, data: meals } = useHttp(`${BASE_URL}/meals`, config, []);
    
    if(error){
        return <Error title="Failed to fech meals" message={error} />
    }

    return (
        <div id='meals'>
            {isLoading && !error && <p>fecthing meals....</p>}
            {!isLoading && !error && meals.map(meal => {
                return (<MealItem key={meal.id} meal={meal} />)
            })}
        </div>
    )
}

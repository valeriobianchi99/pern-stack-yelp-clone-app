import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

export const RestaurantList = (props) => {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext);

    let navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await RestaurantFinder.get("/");
            setRestaurants(response.data.data.restaurants);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(
                restaurants.filter(restaurant => restaurant.id !== id)
            );
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`);
    }

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`);
    }

    return (
        <div className='list-group'>
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope='col'>Restaurant</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Ratings</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id} title="Click the row to see more details">
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>
                                    {
                                        parseInt(restaurant.num_reviews) > 0 &&
                                        <>
                                            <StarRating rating={parseFloat(restaurant.average_rating)} />
                                            <span className='text-warning ml-1'>
                                                {`(${parseInt(restaurant.num_reviews)})`}
                                            </span>
                                        </>
                                    }
                                    {
                                        !(parseInt(restaurant.num_reviews) > 0) &&
                                        <span className="text-warning ml-1">0 reviews</span>
                                    }
                                </td>
                                <td>
                                    <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button>
                                </td>
                                <td>
                                    <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

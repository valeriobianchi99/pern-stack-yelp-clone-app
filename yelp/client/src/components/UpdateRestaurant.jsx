import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {

    const { id } = useParams();

    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = {
            name,
            location,
            price_range: priceRange
        }
        const updatedRestaurant = await RestaurantFinder.put(
            `/${id}`,
            request
        );
        navigate("/");
    }

    const fetchData = async () => {
        const response = await RestaurantFinder.get(`/${id}`);
        const restaurant = response.data.data.restaurant;
        setName(restaurant.name);
        setLocation(restaurant.location);
        setPriceRange(restaurant.price_range);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input name="name" required value={name} onChange={(e) => setName(e.target.value)} type="text" id='name' className="form-control" placeholder='Name' />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="location">Location</label>
                    <input name='location' required value={location} onChange={(e) => setLocation(e.target.value)} type="text" id='location' className="form-control" placeholder='Location' />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price_range">Price range</label>
                    <select name='price_range' required id="price_range" className="form-control" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                        <option value={''} defaultValue>Price Range</option>
                        <option value={1}>$</option>
                        <option value={2}>$$</option>
                        <option value={3}>$$$</option>
                        <option value={4}>$$$$</option>
                        <option value={5}>$$$$$</option>
                    </select>
                </div>
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant;
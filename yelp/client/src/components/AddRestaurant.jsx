import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

export const AddRestaurant = () => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const { addRestaurant } = useContext(RestaurantsContext);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange
            });
            addRestaurant(response.data.data.restaurant);
        } catch (err) {
            console.error(err.message);
        }
    }

  return (
    <div className='mb-4'>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="row">
                <div className="col-sm-4">
                    <input type="text" name='name' required className='form-control' placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)} />
                </div>
                <div className="col-sm-4">
                    <input type="text" name='location' required className="form-control" placeholder='Location' value={location} onChange={(e)=> setLocation(e.target.value)}/>
                </div>
                <div className="col-sm-2">
                    <select className="form-control" name='price_range' required value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                        <option value={""} defaultValue>Price Range</option>
                        <option value={1}>$</option>
                        <option value={2}>$$</option>
                        <option value={3}>$$$</option>
                        <option value={4}>$$$$</option>
                        <option value={5}>$$$$$</option>
                    </select>
                </div>
                <button type='submit' className="col-sm-2 btn btn-primary">Add</button>
            </div>
        </form>
    </div>
  )
}

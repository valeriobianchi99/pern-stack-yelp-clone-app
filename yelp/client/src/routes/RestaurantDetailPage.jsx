import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';

function RestaurantDetailPage() {

  const [name, setName] = useState("");

  const { id } = useParams();

  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  const fetchData = async () => {
    const response = await RestaurantFinder.get(`/${id}`);
    setSelectedRestaurant(response.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {selectedRestaurant.restaurant
        && (
          <>
            <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
            {
              parseInt(selectedRestaurant.restaurant.num_reviews) > 0 &&
              <div className='text-center'>
                <StarRating rating={parseFloat(selectedRestaurant.restaurant.average_rating)} />
                <span className='text-warning'>
                  {` (${parseInt(selectedRestaurant.restaurant.num_reviews)})`}
                </span>
              </div>
            }
            {
              !(parseInt(selectedRestaurant.restaurant.num_reviews) > 0) &&
              <div className="text-center">
                <span className="text-warning ml-1">0 reviews</span>
              </div>
            }
            <div className="mt-3">
              <Reviews reviews={selectedRestaurant.reviews} />
            </div>
            <AddReview />
          </>
        )
      }
    </div>
  )
}

export default RestaurantDetailPage;
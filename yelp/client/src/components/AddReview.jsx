import React, { useState, useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddReview = () => {

    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');

    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext)

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await RestaurantFinder.post(
                `/${id}/addReview`,
                {
                    name,
                    rating,
                    review: reviewText,
                    review_date: new Date().getTime()
                }
            );
            navigate("/");
            navigate(location.pathname);
            setName('');
            setRating('');
            setReviewText('');
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className='mb-2'>
            <form onSubmit={(e) => handleSubmit(e)}>

                <div className="row mb-3">
                    <div className="form-group col-sm-8">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name='name' required placeholder='Name' className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="rating">Rating</label>
                        <select id="rating" name='rating' required className="form-control" value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value={''} defaultValue>Rating</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="form-group col-sm-12">
                        <label htmlFor="review">Review</label>
                        <textarea id="review" name='review' required value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="form-control" placeholder='Review'></textarea>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        </div>
    )
}

export default AddReview
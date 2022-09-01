import React from 'react'
import StarRating from './StarRating';

const Reviews = ({ reviews }) => {
    return (
        <div className='row row-cols-3 mb-2'>
            {reviews && reviews.map(
                (review) => {
                    return (
                        <div key={review.id} className="card text-white bg-primary mb-3 mx-2" style={{ maxWidth: "30%" }}>
                            <div className="card-header d-flex justify-content-between bg-transparent">
                                <span>{review.name}</span>
                                <span>
                                    <StarRating rating={review.rating} />
                                </span>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    {review.review}
                                </p>
                            </div>
                            <div className="card-footer bg-transparent">
                                {new Date(Number.parseInt(review.review_date)).toLocaleString()}
                            </div>
                        </div>
                    )
                }
            )}
        </div>
    )
}

export default Reviews;
require('dotenv').config();
const port = process.env.PORT || 3001;
const cors = require('cors');
const db = require("./db");

const express = require('express');
const app = express();

// Middlewares --- at the top !IMPORTANT
app.use(cors());
app.use(express.json());

// Get all restaurants
app.get(
    "/api/v1/restaurants",
    async (req, res) => {
        try {
            //const results = await db.query("SELECT * FROM restaurants;");
            const restaurantsData = await db.query(`
            SELECT * FROM restaurants LEFT JOIN (
                SELECT restaurant_id, COUNT(*) as num_reviews, TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id
            ) reviews ON restaurants.id = reviews.restaurant_id;
            `);
            res.status(200).json({
                status: "success",
                results: restaurantsData.rows.length,
                data: {
                    restaurants: restaurantsData.rows
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json(
                {
                    message: err.message
                }
            );
        }
    }
);

// Get a single restaurant
app.get(
    "/api/v1/restaurants/:id",
    async (req, res) => {
        try {
            const restaurants = await db.query(
                `SELECT * FROM restaurants LEFT JOIN (
                    SELECT restaurant_id, COUNT(*) as num_reviews, TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id
                    )
                    reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1;
                `,
                [req.params.id]
            );

            const reviews = await db.query(
                "SELECT * FROM reviews WHERE restaurant_id = $1",
                [req.params.id]
            );
            res.status(200).json(
                {
                    status: "success",
                    data: {
                        restaurant: restaurants.rows[0],
                        reviews: reviews.rows
                    }
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).json(
                {
                    message: err.message
                }
            );
        }
    }
);

// Create a restaurant
app.post(
    "/api/v1/restaurants",
    async (req, res) => {
        try {
            const results = await db.query(
                "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
                [
                    req.body.name,
                    req.body.location,
                    req.body.price_range
                ]
            );
            res.status(201).json(
                {
                    status: "success",
                    data: {
                        restaurant: results.rows[0]
                    }
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).json(
                {
                    message: err.message
                }
            );
        }
    }
);

// Update a restaurant
app.put(
    "/api/v1/restaurants/:id",
    async (req, res) => {
        try {
            const results = await db.query(
                "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
                [
                    req.body.name,
                    req.body.location,
                    req.body.price_range,
                    req.params.id
                ]
            );
            res.status(200).json(
                {
                    status: "success",
                    data: {
                        restaurant: results.rows[0]
                    }
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).json(
                {
                    message: err.message
                }
            );
        }
    }
);

// Delete a restaurant
app.delete(
    "/api/v1/restaurants/:id",
    async (req, res) => {
        try {
            const results = await db.query(
                "DELETE FROM restaurants WHERE id = $1",
                [req.params.id]
            );
            res.status(204).json(
                {
                    status: "success"
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).json(
                {
                    message: err.message
                }
            );
        }
    }
);

// Add a review
app.post(
    "/api/v1/restaurants/:id/addReview",
    async (req, res) => {
        try {
            const newReview = await db.query(
                "INSERT INTO REVIEWS (restaurant_id, name, rating, review, review_date) VALUES ($1,$2, $3, $4, $5) RETURNING *",
                [req.params.id, req.body.name, req.body.rating, req.body.review, new Date().getTime()]
            );
            res.status(201).json(
                {
                    status: "success",
                    data: {
                        review: newReview.rows[0]
                    }
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).json(
                {
                    message: err.message
                }
            );
        }
    }
);

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
});
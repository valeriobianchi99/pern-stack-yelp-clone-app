import axios from 'axios';
import errorInterceptor from '../interceptors/ErrorInterceptor';

const RestaurantFinder = axios.create({
    baseURL: "http://localhost:3006/api/v1/restaurants"
});

errorInterceptor(RestaurantFinder)

export default RestaurantFinder;
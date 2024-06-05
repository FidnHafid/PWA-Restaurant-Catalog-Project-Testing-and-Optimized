import RestaurantApi from '../../data/therestodb-source';
import { createRestaurantListTemplate } from '../templates/template-creator';

const NowPlaying = {
  async render() {
    return `
      <div class="hero-container">
        <div class="hero-slider">
        <picture>
        <source media="(max-width: 600px)" srcset="./images/hero-image_2-small.jpg">
        <img src='./images/hero-image_2-large.jpg' 
        alt="Resto 1">
      </picture>
        </div>
      </div>
      <div class="content">
        <h2 class="content__heading">EXPLORE'S PYNE RESTO</h2>
        <div id="movies" class="movies">
        </div>
      </div>
      <div id="restaurants" class="restaurant-container">
        <h1></h1>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantApi.getList();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurantsContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantListTemplate([restaurant]);
    });
  },
};

export default NowPlaying;

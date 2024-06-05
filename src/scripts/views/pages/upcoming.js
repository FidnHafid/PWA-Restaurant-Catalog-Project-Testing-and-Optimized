import RestaurantApi from '../../data/therestodb-source';
import { createRestaurantListTemplate } from '../templates/template-creator';

const Upcoming = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Upcoming Restaurants</h2>
        <div id="restaurants" class="restaurant-container">
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantApi.getList(); // Ambil daftar restoran
    const restaurantsContainer = document.querySelector('#restaurants'); // Ganti id container dengan yang sesuai
    restaurantsContainer.innerHTML = ''; // Kosongkan konten container sebelum menambahkan restoran
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantListTemplate([restaurant]);
    });
  },
};

export default Upcoming;

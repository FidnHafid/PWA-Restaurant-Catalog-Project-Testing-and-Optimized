import { createRestaurantListTemplate } from '../../templates/template-creator';

class FavoriteRestoView {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return `
      <div class="content">
      <input id="query" type="text">
      <h2 class="content__heading">Your Liked Restaurant</h2>
    
      <div id="restaurants" class="restaurant-container">
        </div>
      </div>
      
  `;
  }

  // eslint-disable-next-line class-methods-use-this
  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce(
        // eslint-disable-next-line max-len
        (carry, restaurant) => carry.concat(createRestaurantListTemplate([restaurant])), // Perhatikan penggunaan tanda kurung siku untuk membuat argumen menjadi array
        '',
      );
    } else {
      html = this._getEmptyRestoTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;
    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  showRestaurants(restaurants) {
    this.showFavoriteRestaurants(restaurants);
  }

  // eslint-disable-next-line class-methods-use-this
  _getEmptyRestoTemplate() {
    return `
          <div class="resto-item__not__found">
            Tidak ada Resto untuk ditampilkan
          </div>
        `;
  }
}

export default FavoriteRestoView;

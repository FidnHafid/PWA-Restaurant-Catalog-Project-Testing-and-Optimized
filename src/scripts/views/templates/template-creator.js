import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantListTemplate = (restaurants) => {
  if (Array.isArray(restaurants) && restaurants.length > 0) {
    return restaurants.map((restaurant) => `
      <div class="restaurant-item">
      <picture> 
          <source media="(max-width: 600px)" data-srcset="https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}">
          <img class= "lazyload restaurant-item_header_poster" data-src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" 
          alt="${restaurant.pictureId || '-'}">
        </picture>
        <h3 class="restaurant__title"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h3>
        <p>${restaurant.description || '-'}</p>
        <p>City: ${restaurant.city}</p>
        <p>Rating: ${restaurant.rating || '-'}</p>
      </div>
    `).join('');
  }

  return '<p>No restaurants found.</p>';
};

const createRestaurantDetailTemplate = (restaurant) => {
  if (!restaurant || !restaurant.categories || !restaurant.menus || !restaurant.customerReviews) {
    console.error('Invalid restaurant data provided');
    return '';
  }

  return `
      <h2 class="restaurant__title">${restaurant.name}</h2>
    <br>
    <img class= "lazyload restaurant__poster" data-src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name}" />
    <div class="restaurant__info">
      <h3>Information</h3>
      <h4>Address</h4>
      <p>${restaurant.address}</p>
      <br>
      <h4>City</h4>
      <p>${restaurant.city}</p>
      <br>
      <h4>Description</h4>
      <p>${restaurant.description}</p>
      <br>
      <h4>Rating</h4>
      <p>${restaurant.rating}</p>
      <br>
      <h4>Categories</h4>
      <ul>
        ${restaurant.categories.map((category) => `<li>- ${category.name}</li>`).join('')}
      </ul>
      <br>
      <h3>Menu</h3>
      <div class="restaurant__menu">
        <div class="restaurant__foods">
          <h4>Foods</h4>
          <ul>
            ${restaurant.menus.foods.map((food) => `<li>- ${food.name}</li>`).join('')}
          </ul>
        </div>
        <div class="restaurant__drinks">
          <h4>Drinks</h4>
          <ul>
            ${restaurant.menus.drinks.map((drink) => `<li>- ${drink.name}</li>`).join('')}
          </ul>
        </div>
      </div>
      <h3>Customer Reviews</h3>
      <div class="restaurant__reviews">
        ${restaurant.customerReviews.map((review) => `
          <div class="review">
            <p><strong>${review.name}</strong></p>
            <p>${review.review}</p>
            <p><em>${review.date}</em></p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantListTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};

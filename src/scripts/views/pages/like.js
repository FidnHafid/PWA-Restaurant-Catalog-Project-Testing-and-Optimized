import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
// eslint-disable-next-line no-unused-vars
import { createRestaurantListTemplate } from '../templates/template-creator';
import FavoriteRestoView from './liked-resto/favorite-resto-view';
import FavoriteRestoShowPresenter from './liked-resto/favorite-resto-show-presenter';
import FavoriteRestoSearchPresenter from './liked-resto/favorite-resto-search-presenter';

const view = new FavoriteRestoView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    // eslint-disable-next-line no-new
    new FavoriteRestoShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    // eslint-disable-next-line no-new
    new FavoriteRestoSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
  },
};

export default Like;

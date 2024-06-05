import { spyOn } from 'jest-mock';
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-resto/favorite-resto-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestoView from '../src/scripts/views/pages/liked-resto/favorite-resto-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    view = new FavoriteRestoView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    presenter = new FavoriteRestoSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('Resto a');
      expect(presenter.latestQuery).toEqual('Resto a');
    });

    it('should ask the model to search for liked restaurants', () => {
      searchRestaurants('Resto a');
      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('Resto a');
    });

    it('should show the restaurants found by Favorite restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'Resto a') {
          return [
            { id: 111, name: 'Resto abc' },
            { id: 222, name: 'ada juga Resto abcde' },
            { id: 333, name: 'ini juga boleh Resto a' },
          ];
        }
        return [];
      });

      searchRestaurants('Resto a');
    });

    it('should show the name of the restaurants found by Favorite restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantNames = document.querySelectorAll('.restaurant__title');

        expect(restaurantNames.item(0).textContent).toEqual('Resto abc');
        expect(restaurantNames.item(1).textContent).toEqual('ada juga Resto abcde');
        expect(restaurantNames.item(2).textContent).toEqual('ini juga boleh Resto a');

        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'Resto a') {
          return [
            { id: 111, name: 'Resto abc' },
            { id: 222, name: 'ada juga Resto abcde' },
            { id: 333, name: 'ini juga boleh Resto a' },
          ];
        }

        return [];
      });

      searchRestaurants('Resto a');
    });
  });

  it('should show - when the restaurant returned does not contain a title', (done) => {
    document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
      const restaurantNames = document.querySelectorAll('.restaurant__title');
      expect(restaurantNames.item(0).textContent).toEqual('-');
      done();
    });

    favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
      if (query === 'Resto a') {
        return [{ id: 444 }];
      }

      return [];
    });

    searchRestaurants('Resto a');
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.resto-item__not__found ').length).toEqual(1);
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('Resto a');
    });
  });

  it('should not show any restaurant', (done) => {
    document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
      done();
    });

    favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
    searchRestaurants('Resto a');
  });

  it('should show all favorite restaurants', () => {
    favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
    searchRestaurants('    ');
    expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
  });
});

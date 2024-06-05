class FavoriteRestoSearchPresenter {
  constructor({ favoriteRestaurants, view }) {
    this._favoriteRestaurants = favoriteRestaurants;
    this._view = view;
    this._listenToSearchRequestByUser();
    this._latestQuery = '';
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurants(latestQuery);
    });
  }

  async _searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundRestaurants;
    if (this._latestQuery.length > 0) { // Ubah this.latestQuery menjadi this._latestQuery di sini
      // eslint-disable-next-line max-len
      foundRestaurants = await this._favoriteRestaurants.searchRestaurants(this._latestQuery); // Ubah this.latestQuery menjadi this._latestQuery di sini
    } else {
      foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
    }
    foundRestaurants = foundRestaurants || [];
    this._showFoundRestaurants(foundRestaurants);
  }

  _showFoundRestaurants(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestoSearchPresenter;

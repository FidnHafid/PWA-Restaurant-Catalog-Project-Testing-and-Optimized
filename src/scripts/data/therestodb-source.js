import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantApi {
  static async getList() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants; // Sesuaikan dengan struktur data respons API
  }

  static async search(query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    const responseJson = await response.json();
    return responseJson.restaurants; // Sesuaikan dengan struktur data respons API
  }

  static async getDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant; // Sesuaikan dengan struktur data respons API
  }

  static async addReview(review) {
    const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    return response.json();
  }
}

export default RestaurantApi;

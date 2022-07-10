import axios from 'axios';

export default class PicsApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  async fetchPics() {
    axios.defaults.baseURL = 'https://pixabay.com/api';
    
    const searchParams = new URLSearchParams({
      key: '28442536-1443146eb90a3a0b59e7fe2e3',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });

    try {
      const response = await axios.get(`/?${searchParams}`);
      this.page += 1;
      return response.data.hits;
  } catch (error) {
    console.error(error);
  }
  }

  resetPage() {
    this.page = 1;
}
}
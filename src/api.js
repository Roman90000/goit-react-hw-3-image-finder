import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39450031-d75c446a5d1cfee0bf19f39b0';

export const responseAxios = async (input, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${input}&page=${page}&image_type=photo&per_page=12&orientation=horizontal`
  );
  return response.data.hits;
};

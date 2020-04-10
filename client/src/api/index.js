import axios from 'axios';

export const Cathedra = {
  getAll() {
    return axios.get('/api/cathedras');
  },
};

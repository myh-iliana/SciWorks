import axios from 'axios';

export const Cathedra = {
  getAll() {
    return axios.get('/api/cathedras');
  },
};

export const Auth = {
  register({ fullName, username, email, password, passConfirm, isTeacher, cathedraId }) {
    return axios.post('/api/auth/register', {
      fullName,
      username,
      email,
      password,
      passConfirm,
      isTeacher,
      cathedraId,
    });
  },
};

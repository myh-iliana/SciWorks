import axios from 'axios';
import { setTokens, getRefreshToken, getAccessToken, deleteTokens } from './utils';

// axios.interceptors.request.use(
//   config => {
//     if (config.url !== '/api/auth/refreshToken') {
//       const token = getAccessToken();
//       console.log('req', config.url)
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//
//       return config;
//     }
//     return config;
//   },
//   err => Promise.reject(err)
// );

//--------Refresh token if need
// axios.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     const originalRequest = err.config;
//
//     if (err.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = getRefreshToken();
//
//       if (refreshToken) {
//         axios.post('/api/auth/refreshToken', { refreshToken })
//           .then(res => {
//             Auth.setTokens(res.data.accessToken, res.data.refreshToken);
//             const token = getAccessToken();
//             axios.defaults.headers.Authorization = `Bearer ${token}`;
//             originalRequest.headers['Authorization'] = `Bearer ${token}`;
//             const request = {...originalRequest, headers: {Authorization: `Bearer ${token}`}};
//             return axios(request);
//           })
//           .catch(err => console.log('refresh error', err));
//       }
//     }
//
//     if (err.response.status === 401) console.log('log in please');
//     return Promise.reject(err);
//   },
// );

export const Auth = {
  _token: null,
  _refreshToken: null,

  setTokens(token, refreshToken) {
    this._token = token;
    this._refreshToken = refreshToken;
    setTokens(token, refreshToken);

    axios.defaults.headers.Authorization = `Bearer ${token}`;
  },

  isLoggedIn() {
    return !!this._token;
  },

  logout() {
    this._token = null;
    deleteTokens();
    axios.defaults.headers.Authorization = undefined;
  },

  login({ username, password }) {
    return axios.post('/api/auth/login', { username, password });
  },

  refreshToken({ refreshToken }) {
    return axios.post('/api/auth/refreshToken', { refreshToken });
  },

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

export const Cathedra = {
  getAll() {
    return axios.get('/api/cathedras');
  },

  getById(id) {
    return axios.get(`/api/cathedras/${id}`);
  },
};

export const Users = {
  getMainUser() {
    return axios.get('/api/users/account');
  },

  getUser(username) {
    return axios.get(`/api/users/${username}`);
  },

  getAll() {
    return axios.get('/api/users');
  },

  edit(data) {
    return axios.put('/api/users/account', data);
  },

  changeAvatar(avatar) {
    return axios.put('/api/users/account/avatar', avatar);
  },
};

export const Posts = {
  createPeriodicity(data) {
    return axios.post('/api/posts/periodicity', data);
  },

  createThesis(data) {
    return axios.post('/api/posts/thesis', data);
  },

  createMonograph(data) {
    return axios.post('/api/posts/monograph', data);
  },

  getPeriodicity(id) {
    return axios.get(`/api/posts/periodicity/${id}`);
  },

  getThesis(id) {
    return axios.get(`/api/posts/thesis/${id}`);
  },

  getMonograph(id) {
    return axios.get(`/api/posts/monograph/${id}`);
  },
};

export const Files = {
  upload(data) {
    return axios.post('/api/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

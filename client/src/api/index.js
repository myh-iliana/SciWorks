import axios from 'axios';

export const Auth = {
  _token: null,
  _refreshToken: null,

  setTokens(token, refreshToken) {
    this._token = token;
    this._refreshToken = refreshToken;
    localStorage.setItem('_token', token);
    localStorage.setItem('_refreshToken', refreshToken);
    //--------Refresh token if need
    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response.status === 401 || 403) {
          if (this._token) {
            localStorage.removeItem('_token');
          }

          if (this._refreshToken) {
            const token = this._refreshToken;

            localStorage.removeItem('_refreshToken');

            axios.post('/api/auth/refreshToken', { token })
              .then(res => {
                localStorage.setItem('_token', res.data.accessToken);
                localStorage.setItem('_refreshToken', res.data.refreshToken);
              });
          }
        }
        return Promise.reject(err);
      },
    );
    //---------------------
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  },

  isLoggedIn() {
    return !!this._token;
  },

  logout() {
    this._token = null;
    localStorage.removeItem('_token');
    localStorage.removeItem('_refreshToken');
    axios.defaults.headers.Authorization = undefined;
  },

  login({ username, password }) {
    return axios.post('/api/auth/login', { username, password });
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
};

export const Users = {
  getMainUser() {
    return axios.get('/api/users/account');
  }
};

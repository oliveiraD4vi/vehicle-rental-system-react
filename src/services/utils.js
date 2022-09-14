const AUTH = "GCUSER";

export const auth = {
  login(authData) {
    localStorage.setItem(AUTH, JSON.stringify(authData));
  },
  logout() {
    localStorage.removeItem(AUTH);
  },
  isAuthenticated() {
    if (localStorage.getItem(AUTH) !== null) return true;
    return false;
  },
  getToken() {
    const { token } = JSON.parse(localStorage.getItem(AUTH));
    return token;
  },
  getId() {
    const { userId } = JSON.parse(localStorage.getItem(AUTH));
    return userId;
  },
};

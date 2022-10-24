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
    if (localStorage.getItem(AUTH)) {
      const { token } = JSON.parse(localStorage.getItem(AUTH));
      return token;
    } else return false;
  },
  getId() {
    if (localStorage.getItem(AUTH)) {
      const { userId } = JSON.parse(localStorage.getItem(AUTH));
      return userId;
    } else return false;
  },
  getRole() {
    if (localStorage.getItem(AUTH)) {
      const { role } = JSON.parse(localStorage.getItem(AUTH));
      return role;
    } else return false;
  },
};

export const rolesPath = [
  {
    path: "/",
    role: ['CLIENT']
  },
  {
    path: "/cars",
    role: ['CLIENT']
  },
  {
    path: "/about",
    role: ['CLIENT']
  },
  {
    path: "/reservations",
    role: ['CLIENT']
  },
  {
    path: "/admin/home",
    role: ['ADMIN']
  },
];

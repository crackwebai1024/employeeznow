import Axios from "axios";

const TOKEN_KEY = "TOKEN";
const USER_CONFIGURED = "CONFIGURED";
const USER_SETTING = "USER_SETTING";
const USER = "USER";

export function setUser(user) {
  localStorage.setItem(USER, JSON.stringify(user));
}
export function getUser() {
  return localStorage.getItem(USER);
}
export function deleteUser() {
  localStorage.removeItem(USER);
}
export function setRole(role) {
  localStorage.setItem("role", role);
}
export function getRole() {
  return localStorage.getItem("role");
}
export function setFilterID(id) {
  localStorage.setItem("currentFilterID", id);
}
export function getFilterID() {
  return localStorage.getItem("currentFilterID");
}
export function deleteRole() {
  localStorage.removeItem("role");
}
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setUserConfigured() {
  localStorage.setItem(USER_CONFIGURED, "true");
}

export function getUserConfigured() {
  let isConfigured = localStorage.getItem(USER_CONFIGURED);
  if (isConfigured) return true;

  return false;
}

export function deleteUserConfigured() {
  localStorage.removeItem(USER_CONFIGURED);
}

export function setUserSetting(setting) {
  localStorage.setItem(USER_SETTING, JSON.stringify(setting));
}

export function getUserSetting() {
  let setting = localStorage.getItem(USER_SETTING);
  if (!setting) return null;

  try {
    return JSON.parse(setting);
  } catch {
    return null;
  }
}

export function initAxiosInterceptors() {
  Axios.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
      config.headers.Token = token;
      // config.headers.Authorization = `Bearer ${token}`;
      // config.headers.Language = getCurrentLng();
    }
    return config;
  });

  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error("401 - Unauthorized: " + error.toString());
        }
        if (error.response.status === 403) {
          throw new Error("404 - Forbidden: " + error.toString());
        }
        if (error.response.status === 404) {
          throw new Error("404 - Not found: " + error.toString());
        }
        if (error.response.status === 422) {
          return error.response;
          // throw new Error ("404 - Not found: " + error.toString());
        }
      } else {
        throw new Error(error.toString());
      }
    }
  );
}

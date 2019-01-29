export const setCache = (key, obj) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

export const getCache = key => JSON.parse(localStorage.getItem(key));

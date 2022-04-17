// check either an object is empty or not
export const isEmpty = (obj) => {
  return obj && Object.values(obj).length === 0;
};

export const fetcher = (url) => fetch(url).then((res) => res.json());

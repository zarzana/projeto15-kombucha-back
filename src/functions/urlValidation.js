export const isURL = (url) => {
  const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\/.*)?$/i;
  return pattern.test(url);
};
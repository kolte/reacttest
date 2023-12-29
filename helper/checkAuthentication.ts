export const checkAuthentication: () => boolean = () => {
  return !!localStorage.getItem("token");
};
export const removeLoginToken: () => void = () => {
  localStorage.removeItem("token");
};

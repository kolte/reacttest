export const checkAuthentication: () => boolean = () => {
  return !!localStorage.getItem("token");
};

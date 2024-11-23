import { cookies } from "next/headers";

const isAuthenticated = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log("Token on server: ", token);
  return token ? true : false;
};

const getUserInfo = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { name: payload.name, userId: payload.userId };
    } catch (e) {
      return null;
    }
  }
  return null;
};

export { isAuthenticated, getUserInfo };

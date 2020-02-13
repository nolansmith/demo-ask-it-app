import axios from "axios";

export const verifyUserLogin = async function(user) {
  if (!user.authenticated) return { valid: false };
  let { token } = user;

  let tokenURL =
    process.env.NODE_ENV === "production"
      ? "/token"
      : process.env.SERVER_DEVELOPMENT_URL + "/token";

  let {data} = await axios
    .get(tokenURL + `/${token}`);

    return data;
   
};

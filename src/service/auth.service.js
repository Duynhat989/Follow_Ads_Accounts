import request from "@/components/interact/request";
import { setAuth } from "@/components/interact/request";
const API_URL = "api/auth/extension/login";

class AuthService {
  async login(user) {
    return await request
      .post(API_URL, {
        email: user.email,
        password: user.password,
        app_name: user.app_name,
      })
      .then((response) => {
        const data = response.data
        localStorage.setItem("user", JSON.stringify(response.data));
        setAuth()
        return response.data
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e);

      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();


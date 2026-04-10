import type { AuthInfo } from "../types/user";
import { jwtDecode } from "jwt-decode";

const USER = btoa("RADIANCE");

class Utils {
  static setAuthInfo(data: AuthInfo) {
    localStorage.setItem(USER, JSON.stringify(data));
  }

  static getAuthInfo(): AuthInfo | null {
    const userInfo = localStorage.getItem(USER);
    return userInfo ? JSON.parse(userInfo) : null;
  }

  static clearAuthInfo() {
    localStorage.removeItem(USER);
  }

  static isTokenExpired(token: string) {
    if (!token) return true;
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp) return true;
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch (err) {
      console.error("Token invalide :", err);
      return true;
    }
  }
}

export default Utils;

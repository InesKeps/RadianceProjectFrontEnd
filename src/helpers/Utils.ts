import type { AuthInfo } from "../types/user";
import { jwtDecode } from "jwt-decode";

const USER = btoa("RADIANCE");

class Utils {
  static setAuthInfo(data: AuthInfo) {
    localStorage.setItem(USER, JSON.stringify(data));
  }

  static getAuthInfo() {
    const userInfo = localStorage.getItem(USER);
    if (userInfo) {
        const data = JSON.parse(userInfo);
        return data;
    } else {
      return null;
    }
  }

  static clearAuthInfo() {
    localStorage.removeItem(USER);
  }

  /**
   * Vérifie si un JWT est expiré
   * @param {string} token - Le token JWT
   * @returns {boolean} - true si expiré, false sinon
   */
  static isTokenExpired(token: string) {
    if (!token) return true; // Pas de token => considéré comme expiré

    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return true; // Pas de champ exp => considéré comme expiré
      // decoded.exp, la date est en seconde
      // Date.now(), la date est en milliseconde
      const now = Math.floor(Date.now() / 1000);// Conversion pour passer en seconde
      return decoded.exp < now;
    } catch (err) {
      console.error("Token invalide :", err);
      return true; // Token mal formé => considéré comme expiré
    }
  }
}

export default Utils;

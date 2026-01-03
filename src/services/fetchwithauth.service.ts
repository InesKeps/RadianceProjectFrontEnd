import Utils from "../helpers/Utils";
import { logoutAction, refreshAction } from "../store/auth/actions";

const fetchWithAuth = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const { store } = await import("../store/store");
  const state = store.getState();
  let token = state.auth.userInfo?.token;

  if (!token || Utils.isTokenExpired(token)) {
    const result = await store.dispatch(refreshAction());

    if (refreshAction.fulfilled.match(result)) {
      const authInfo = result.payload.data;
      token = authInfo.token;
    } else {
      store.dispatch(logoutAction());
      window.location.href = "/login";
      throw new Error("Token expired, user logged out");
    }
  }

  return fetch(input, {
    ...init,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });
};

export default fetchWithAuth;

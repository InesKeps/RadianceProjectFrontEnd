
const fetchWithAuth = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  let response = await fetch(input, {
    ...init,
    credentials: "include",
    headers: {
      accept: "application/json",
      ...init?.headers,
    },
  });

  if (response.status === 401) {
    // Essayer de rafraîchir le token
    const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/users/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { accept: "application/json" },
    });

    if (refreshRes.ok) {
      // Relancer la requête initiale
      response = await fetch(input, {
        ...init,
        credentials: "include",
        headers: {
          accept: "application/json",
          ...init?.headers,
        },
      });
    }
  }

  return response;
};

export default fetchWithAuth;

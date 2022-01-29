const authAPI = {
  getAuthTokens(email: string, password: string) {
    const url = new URL(
      "https://api.chatapp.online/v1/tokens"
    );
  
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
  
    const body = {
      "email": email,
      "password": password,
      "appId": "app_6448_1"
    };
  
    return fetch(url.toString(), {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }).then((response) => {
      return response.json();
    });
  },
}

export {
  authAPI,
};
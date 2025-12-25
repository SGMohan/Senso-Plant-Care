import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const handleFetch = async (url: string, options: any) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (error: any) {
    if (error.message === 'Network request failed') {
      throw new Error("Unable to connect to server. Please check your internet connection and ensure the backend is running.");
    }
    throw error;
  }
};

/* --------------------------------------------------
   NORMAL LOGIN
---------------------------------------------------*/
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  return handleFetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
};

/* --------------------------------------------------
   NORMAL REGISTER
---------------------------------------------------*/
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  return handleFetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

/* --------------------------------------------------
   FORGOT PASSWORD
---------------------------------------------------*/
export const forgotPassword = async (email: string) => {
  return handleFetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};

/* --------------------------------------------------
   GOOGLE LOGIN
---------------------------------------------------*/
export const googleBackendLogin = async (idToken: string) => {
  return handleFetch(`${API_BASE_URL}/api/auth/google/mobile-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
};

/* --------------------------------------------------
   LOGOUT
---------------------------------------------------*/
export const logoutUser = async (token: string) => {
  return handleFetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

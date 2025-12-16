// Authentication service for API calls
const API_BASE_URL = 'http://192.168.1.3:3000/api/auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  token?: string;
}





// Login user
export const loginUser = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  
  return data;
};

// Register user
export const registerUser = async (userData: RegisterRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  
  return data;
};





// Logout user
export const logoutUser = async (token: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Logout failed');
  }
  
  return data;
};
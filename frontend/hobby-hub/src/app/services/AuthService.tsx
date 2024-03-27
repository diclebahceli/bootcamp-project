import axios from "axios";
import { RegisterInfo } from "../Models/registration";
import { NEXT_PUBLIC_BACKEND_API_URL } from "../utils/config";
import { LoginModel } from "../Models/login";
import { LoginResponse } from "../Models/loginResponse";
import { jwtDecode } from "jwt-decode";

export async function RegisterUser(register: RegisterInfo): Promise<void> {
  const { fullName, email, password } = register;

  const response = await axios.post(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Auth/Register`,
    { fullName: fullName, email: email, password: password }
  );
  // Optionally, handle successful registration (e.g., display a success message)
}

export async function LoginUser(login: LoginModel): Promise<void> {
  const response = await axios.post(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Auth/Login`,
    login
  );
  if (response.status == 200) {
    localStorage.setItem("accessToken", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    const decoded: DecodedAccessToken = jwtDecode(response.data.token);
    localStorage.setItem(
      "userId",
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ]
    );
    localStorage.setItem("email", decoded.email);
  }
}

export async function RenewToken(): Promise<string> {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.post(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Auth/refreshtoken`,
    {
      accessToken: accessToken,
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to refresh token");
  }
  return response.data.accessToken;
}

export async function Revoke(email: string) {
  ClearLocalStorage();
  await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/api/Auth/revoke`, {
    email: email,
  });
}

export async function RevokeAll() {
  ClearLocalStorage();
  axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/api/Auth/revokeall`);
}

export function SetInterceptors() {
  axios.interceptors.request.use(
    async (config) => {
      if (!isAccessTokenValid()) {
        const newAccessToken = await RenewToken();
        localStorage.setItem("accessToken", newAccessToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export function ClearLocalStorage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
}

function isAccessTokenValid(): boolean {
  const storedToken = localStorage.getItem("accessToken");
  if (!storedToken) {
    return false; // No token stored
  }

  try {
    const decodedToken: DecodedAccessToken = jwtDecode(storedToken);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    return expirationTime > currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false; // Handle decoding errors conservatively
  }
}

export function GetRoleOfUser(): string {
  if (isAccessTokenValid()) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return "";
    }
    const decodedToken: DecodedAccessToken = jwtDecode(token);
    return decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  } else {
    return "";
  }
}

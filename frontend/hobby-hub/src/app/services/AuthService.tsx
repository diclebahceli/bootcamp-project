import axios from "axios";
import { Register } from "../Models/registration";
import { NEXT_PUBLIC_BACKEND_API_URL } from "../utils/config";
import { LoginModel } from "../Models/login";
import { LoginResponse } from "../Models/loginResponse";

export async function RegisterUser(register: Register): Promise<void> {
  try {
    const response = await axios.post(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/Auth/Register`,
      register
    );
    // Optionally, handle successful registration (e.g., display a success message)
    console.log("Registration successful:", response.data);
  } catch (error) {
    throw new Error("Registration failed. Please try again.");
  }
}

export async function LoginUser(login: LoginModel): Promise<void> {
  try {
    const response = await axios.post(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/Auth/Login`,
      login
    );
    if (response.status == 200) {
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
}

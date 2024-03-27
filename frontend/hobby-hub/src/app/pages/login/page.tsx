"use client";
import React, { useState } from "react";
import { LoginUser, SetInterceptors } from "@/app/services/AuthService";
import { useRouter } from "next/navigation";
import { LoginModel } from "@/app/Models/login";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const handleValidation = (event: any) => {
    event.preventDefault();
    let formIsValid = true;
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
    } else {
      setemailError("");
      formIsValid = true;
    }
    if (!password.length || password.length < 6 || password.length > 22) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
    } else {
      setpasswordError("");
      formIsValid = true;
    }
    if (formIsValid) {
      loginSubmit();
    }
    return formIsValid;
  };

  const loginSubmit = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const userData: LoginModel = {
        email: email,
        password: password,
      };

      await LoginUser(userData);
      SetInterceptors();
      console.log(localStorage.getItem("userId"));
      setSuccessMessage("Login successful");

      router.push("/pages/home");
    } catch (error: Error | any) {
      setError("Wrong password or email");
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center vh-100">
        <div className="col-sm-4 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-center align-items-center flex-column ">
                <h5 className="card-title">Login</h5>
                <form id="loginform" onSubmit={handleValidation}>
                  <div className="form-group  mb-2">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="EmailInput"
                      name="EmailInput"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <small id="emailHelp" className="text-danger form-text">
                      {emailError}
                    </small>
                  </div>
                  <div className="form-group mb-2">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <small id="passworderror" className="text-danger form-text">
                      {passwordError}
                    </small>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <Link href={"/pages/register"} className="fs-6">
                      or Signup
                    </Link>
                  </div>
                  <small id="finalMesasge" className="text-success form-text">
                    {successMessage}
                  </small>
                  <small id="error" className="text-danger form-text">
                    {error}
                  </small>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;

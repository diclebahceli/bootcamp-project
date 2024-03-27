"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RegisterInfo } from "@/app/Models/registration";
import { RegisterUser } from "@/app/services/AuthService";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Register() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleValidation = async () => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
    } else {
      setemailError("");
      formIsValid = true;
    }
    if (fullName.length < 3) {
      formIsValid = false;
      setFullNameError("Name must be atleast 3 characters long");
    } else {
      setFullNameError("");
    }
    if (!password.length || password.length < 8 || password.length > 22) {
      formIsValid = false;
      setpasswordError("Length must be between 8-22 characters");
    } else {
      setpasswordError("");
      formIsValid = true;
    }
    if (password !== confirmPassword) {
      formIsValid = false;
      setpasswordError("Passwords do not match");
    }
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    if (formIsValid) {
      await handleRegister();
    }
    return formIsValid;
  };

  const handleRegister = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const userData: RegisterInfo = {
        fullName: fullName,
        email: email,
        password: password,
      };
      await RegisterUser(userData);
      setSuccessMessage("Registration successful");
      router.push("/pages/login");
    } catch (error: Error | any) {
      setError(error.message);
    }
  };

  const registerSubmit = (e: any) => {
    e.preventDefault();
    handleValidation();
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center flex-column ">
                  <h5 className="card-title">Register</h5>
                  <form id="registerform" onSubmit={registerSubmit}>
                    <div className="form-group mb-2">
                      <label>Full Name</label>
                      <input
                        className="form-control"
                        id="Full Name"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                      />
                      <small
                        id="fullnameHelp"
                        className="text-danger form-text"
                      >
                        {fullNameError}
                      </small>
                    </div>

                    <div className="form-group  mb-2">
                      <label>Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="EmailInput"
                        name="EmailInput"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        value={email}
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
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <small
                        id="passworderror"
                        className="text-danger form-text"
                      >
                        {passwordError}
                      </small>
                    </div>

                    <div className="form-group mb-2">
                      <label>Password again</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password again"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                      />
                      <small
                        id="passworderror"
                        className="text-danger form-text"
                      >
                        {passwordError}
                      </small>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                      <Link href={"/pages/login"} className="fs-6">
                        or Login
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
    </div>
  );
}
export default Register;

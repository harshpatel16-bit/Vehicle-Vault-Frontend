import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Navbar } from "../layout/Navbar";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/forgotpassword", {
        email: data.email,
      });
      setMessage(res.data.message);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong! Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          height: "100vh",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="row justify-content-center" style={{ width: "90%" }}>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white text-center">
                <h4>Forgot Password</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      {...register("email", { required: "Email is required" })}
                    />
                    <span style={{ color: "red" }}>
                      {errors.email?.message}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100">
                    Send Reset Link
                  </button>
                </form>

                {message && (
                  <div className="text-center mt-3">
                    <p
                      style={{
                        color: message.includes("sent") ? "green" : "red",
                      }}
                    >
                      {message}
                    </p>
                  </div>
                )}

                <div className="text-center mt-3">
                  <p>
                    Remembered your password?
                    <Link to={"/login"}> Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

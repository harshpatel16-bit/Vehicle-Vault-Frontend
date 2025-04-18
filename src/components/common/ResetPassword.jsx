import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'


export const ResetPassword = () => {
    const token = useParams().token
    const {register,handleSubmit,watch, formState: { errors }} = useForm()
    const navigate = useNavigate()
    const submitHandler = async(data)=>{
        //resetpasseord api..
        const obj = {
            token:token,
            password:data.password
        }
        const res = await axios.post("/user/resetpassword",obj)
        console.log(res.data)
        navigate("/login")


            

    }
  return (
    <>
    <div
  style={{
    height: "100vh",
    width: "100vw",
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
          <h4>Reset Password</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your new password"
                {...register("password", { required: "Password is required" })}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your new password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
                                  <span style={{ color: "red" }}>{errors.confirmPassword?.message}</span>

            </div>

            <button type="submit" className="btn btn-primary w-100">
              Reset Password
            </button>
          </form>


          

         

          <div className="text-center mt-3">
            <p>
              Remembered your password? <Link to={"/login"}> Login</Link>

            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  


  )
}
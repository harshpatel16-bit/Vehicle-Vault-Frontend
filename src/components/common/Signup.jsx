import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Navbar } from '../layout/Navbar'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Signup = () => {



    const {register,handleSubmit,control,formState:{errors}} = useForm()
    const password = useWatch({ control, name: "password", defaultValue: "" }); // ✅ Correct usage of useWatch

    const navigate = useNavigate()
  const submitHandler = async (data)=>{
    console.log(data);
      data.roleId = "6895f695ee6969a4d6a72d43";
      try {
        const res = await axios.post("/user", data);
        console.log(res.data);
        if (res.status === 201) {
        //   localStorage.setItem("user", JSON.stringify({ fullName: data.fullName, username: data.username }));
          navigate("/login");
        } else {
          alert("Signup failed, please try again.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("An error occurred. Please try again.");
      }
  }




  //validation schema

        const validationSchema={
            
            emailValidator :{
            required:{
                value:true,
                message:"email is required*"
            }
        },
        passwordValidator:{
            required:{
                value:true,
                message:"password is required*"
            }
        },
        nameValidator:{
            required:{
                value:true,
                message:"username is required*"
            }
        },
        confirmPasswordValidator:{
            required:{
                value:true,
                message:"confirm password is required*"
            },
            validate: (value) => value === password || "Passwords do not match!"
        }




    }














  return (
    <>
    <Navbar></Navbar>
    <div style={{height:'100vh',width:'100%',boxSizing:'border-box',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <div className="row justify-content-center"  style={{width:'90%',marginTop:'30px'}}>
        <div className="col-md-6">
            <div className="card">
                <div className="card-header bg-primary text-white text-center">
                    <h4>Signup</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">User Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter your full name" {...register("userName",validationSchema.nameValidator)}></input>
                            <span style={{color:"red"}}>
                            {errors.name?.message}
                            </span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email" {...register("email",validationSchema.emailValidator)}></input>
                            <span style={{color:"red"}}>
                            {errors.email?.message}
                            </span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter your password" {...register("password",validationSchema.passwordValidator)}></input>
                            <span style={{color:"red"}}>
                            {errors.password?.message}
                            </span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirm-password" placeholder="Confirm your password" {...register("confirmPassword",validationSchema.confirmPasswordValidator)}></input>
                            <span style={{color:"red"}}>
                            {errors.confirmPassword?.message}
                            </span>
                        </div>
                        {/* <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="terms"></input>
                            <label class="form-check-label" for="terms">I agree to the terms and conditions</label>
                        </div> */}
                        <button type="submit" className="btn btn-primary w-100">Signup</button>
                    </form>
                    <div className="text-center mt-3">
                        <p>Already have an account? <Link to={"/login"}>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}

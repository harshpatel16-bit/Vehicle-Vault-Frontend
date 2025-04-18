import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../layout/Navbar'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import swal from 'sweetalert2'

export const Login = () => {

  const navigate=useNavigate();

  const {register,handleSubmit,formState:{errors}} = useForm();


  const submitHandler = async (data)=>{
    
    try{
    const res = await axios.post("/user/login",data)
    console.log(res.data)
    if(res.status === 200){


      // alert("Login Success") 
      swal.fire({
        title: "Success",
        text:"Login Success!!",
        icon: "success",
        showConfirmButton: false,
       timer: 1500
      });



      // navigate("/usersidebar")
      localStorage.setItem("id", res.data.data._id)
      localStorage.setItem("role", res.data.data.roleId.name)
      localStorage.setItem("username",res.data.data.userName)
      localStorage.setItem("email",res.data.data.email)
      if (res.data.data.roleId.name === "user") {
        navigate("/usersidebar/profile")
      } else if(res.data.data.roleId.name === "admin"){
        navigate("/adminsidebar/welcome")
      }
      
    }
    else{
      alert("Login Failed")
    }
   } catch (error){
      console.log("Login Error:",error);
      

      swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "login failed please try again!!",
         showConfirmButton: false,
         timer: 1500

      
        
      });
      

   }
  
    
      

    
  }


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
            }




  }



  return (
        <>
          



        <Navbar></Navbar>

        
       
      <div style={{height:'100vh',width:'100%',boxSizing:'border-box',display:'flex',justifyContent:'center',alignItems:'center'}}>


       

             


      

        
      <div className="row justify-content-center" style={{width:'90%'}}>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white text-center">
              <h4>Login</h4>
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
                    {...register("email",validationSchema.emailValidator)}
                  />
                  <span style={{color:"red"}}>
                        {errors.email?.message}
                    </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    {...register("password",validationSchema.passwordValidator)}
                  />
                  <span style={{color:"red"}}>
                        {errors.password?.message}
                    </span>
                </div>
                
                  {/* <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                  /> */}
                  {/* <label className="form-check-label" htmlFor="remember">
                    Remember me
                  </label> */}
                
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Don't have an account? <Link to={"/signup"}>SignUp</Link>
                </p>
                <p>
                 <Link to={"/forgotpassword"}>Forgot Password?</Link>
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

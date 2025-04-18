import React from 'react'
import { Home } from './Home'
import { Link, Outlet } from 'react-router-dom'
import { Footer } from './Footer'

export const Navbar = () => {
  return (
    <>
      <div>
         <div style={{width:'100%',boxSizing:'border-box',padding:'0px 0px',fontFamily:'"Montserrat", serif',position:'fixed',zIndex:'1',marginBottom:'10px'}}>
            <nav class="navbar navbar-expand-lg navbar-light bg-light container-fluid" style={{width:'100%',borderRadius:'0px',padding:'10px',marginTop:'0px',boxShadow:'3px 3px 5px #888888'}}>
            <a class="navbar-brand" href="/home" style={{fontWeight:'bold'}}>Vehicle Vault</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    {/* <a class="nav-link" href="/home">Home <span class="sr-only">(current)</span></a> */}
                    <Link class="nav-link" to={"/home"}>Home</Link>

                    
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to={"/contactus"}>Contact Us</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to={"/aboutus"}>About Us</Link>
                </li>
                
                
                </ul>
                <form class="form-inline my-2 my-lg-0"> 
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button class="btn btn-outline-success my-2 my-sm-0 mr-3" type="submit"><i class="fa-solid fa-magnifying-glass"></i>&nbsp;Search</button>
                </form>
                <Link to={"/login"} style={{textDecoration:'none',color:'black'}}><i class="fa-solid fa-user"></i>&nbsp;Login/Signup</Link>
            </div>
            </nav>

        </div>

                
                
        
        </div>
        
    
    </>
  )
}

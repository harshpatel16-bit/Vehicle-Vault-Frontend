import React, { useEffect, useState } from 'react'
import { UserProfile } from '../user/UserProfile'
import { Link, Navigate } from 'react-router-dom'
import swal from 'sweetalert2'



export const AdminNavbar = () => {

  



  const [username, setUsername] = useState("");
  const[email,setemail] = useState("");

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedemail = localStorage.getItem("email");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    setemail(storedemail);
  }, []);

  


  const handleLogout = () => {
     swal.fire({
                title: "success",
                icon: "success",
                text:"Sign Out Successfull!!",
                showConfirmButton: false,
                timer:1500
    
              });
    // Remove user data from localStorage
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("compareCars");

    // Redirect to login page
   
  };




  return (
    
    <nav className="app-header navbar navbar-expand bg-body">
    {/*begin::Container*/}
    <div className="container-fluid">
      {/*begin::Start Navbar Links*/}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-lte-toggle="sidebar"
            href="#"
            role="button"
          >
            <i className="bi bi-list" />
          </a>
        </li>
        <li className="nav-item d-none d-md-block">
          
          <Link className="nav-link" to={'/adminsidebar/dashboard'}>Home</Link>
        </li>
        <li className="nav-item d-none d-md-block">
          <a href="#" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
      {/*end::Start Navbar Links*/}
      {/*begin::End Navbar Links*/}
      <ul className="navbar-nav ms-auto">
        {/*begin::Navbar Search*/}
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="navbar-search"
            href="#"
            role="button"
          >
            <i className="bi bi-search" />
          </a>
        </li>
        {/*end::Navbar Search*/}
        {/*begin::Messages Dropdown Menu*/}
        <li className="nav-item dropdown">
          {/* <a className="nav-link" data-bs-toggle="dropdown" href="#">
            <i className="bi bi-chat-text" />
            <span className="navbar-badge badge text-bg-danger">3</span>
          </a> */}
         
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
            <a href="#" className="dropdown-item">
              {/*begin::Message*/}
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <img
                    src="../../dist/assets/img/user1-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 rounded-circle me-3"
                  />
                </div>
                {/* <div className="flex-grow-1">
                  <h3 className="dropdown-item-title">
                    Brad Diesel
                    <span className="float-end fs-7 text-danger">
                      <i className="bi bi-star-fill" />
                    </span>
                  </h3>
                  <p className="fs-7">Call me whenever you can...</p>
                  <p className="fs-7 text-secondary">
                    <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
                  </p>
                </div> */}
              </div>
              {/*end::Message*/}
            </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              {/*begin::Message*/}
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <img
                    src="../../dist/assets/img/user8-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 rounded-circle me-3"
                  />
                </div>
               
              </div>
              {/*end::Message*/}
            </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              {/*begin::Message*/}
              {/* <div className="d-flex">
                <div className="flex-shrink-0">
                  <img
                    src='user1.jpg'
                    alt="User Avatar"
                    className="img-size-50 rounded-circle me-3"
                  />
                </div>
                <div className="flex-grow-1">
                  <h3 className="dropdown-item-title">
                    Nora Silvester
                    <span className="float-end fs-7 text-warning">
                      <i className="bi bi-star-fill" />
                    </span>
                  </h3>
                  <p className="fs-7">The subject goes here</p>
                  <p className="fs-7 text-secondary">
                    <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
                  </p>
                </div>
              </div> */}
              {/*end::Message*/}
            </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item dropdown-footer">
              See All Messages
            </a>
          </div>
        </li>
        {/*end::Messages Dropdown Menu*/}
        {/*begin::Notifications Dropdown Menu*/}
        {/* <li className="nav-item dropdown">
          <a className="nav-link" data-bs-toggle="dropdown" href="#">
            <i className="bi bi-bell-fill" />
            <span className="navbar-badge badge text-bg-warning">15</span>
          </a>
          
        </li> */}
        {/*end::Notifications Dropdown Menu*/}
        {/*begin::Fullscreen Toggle*/}
        <li className="nav-item">
          <a className="nav-link" href="#" data-lte-toggle="fullscreen">
            <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen" />
            <i
              data-lte-icon="minimize"
              className="bi bi-fullscreen-exit"
              style={{ display: "none" }}
            />
          </a>
        </li>
        {/*end::Fullscreen Toggle*/}
        {/*begin::User Menu Dropdown*/}
        <li className="nav-item dropdown user-menu">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {/* <img
              src="../../dist/assets/img/user2-160x160.jpg"
              className="user-image rounded-circle shadow"
              alt="User Image"
            /> */}
            <span className="d-none d-md-inline"> {username || "User"}</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
            {/*begin::User Image*/}
            <li className="user-header text-bg-primary">
              <img
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                className="rounded-circle shadow"
                alt="User Image"
              />
              <p>
              {username || "User"}
                <small>{email}</small>
              </p>
            </li>
            {/*end::User Image*/}
            {/*begin::Menu Body*/}
            <li className="user-body">
              {/*begin::Row*/}
            
              {/*end::Row*/}
            </li>
            {/*end::Menu Body*/}
            {/*begin::Menu Footer*/}
            <div className="user-footer" style={{display:"flex"}}>
              {/* <a href="#" className="btn btn-default btn-flat">
                Profile
              </a> */}

              <Link onClick={handleLogout}  to={"/login"} className="btn btn-default btn-flat float-end" style={{backgroundColor:"rgba(246, 61, 64, 0.9)",color:"white",margin:"auto"}}>
              
              Sign out
              </Link>

            </div>
            {/*end::Menu Footer*/}
          </ul>
        </li>
        {/*end::User Menu Dropdown*/}
      </ul>
      {/*end::End Navbar Links*/}
    </div>
    {/*end::Container*/}
  </nav>
  
  
  
  )
}

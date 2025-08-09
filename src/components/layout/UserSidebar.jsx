import React from 'react'
import { UserNavbar } from './UserNavbar'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserProfile } from '../user/UserProfile'
import logo from "../image/V.png"

export const UserSidebar = () => {
  const navigate=useNavigate();
   if(!(localStorage.getItem("id"))){
        navigate('/login');
    }
  
  return (
    <>
        
        <UserNavbar></UserNavbar>
        <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          
          
          <Link to={"/usersidebar/profile"} className="brand-link">
            
            <img
              src={logo}
              alt=""
              style={{borderRadius:"20%"}}
              className="brand-image opacity-90 shadow"
            />
            
            <span className="brand-text fw-light" style={{fontFamily:"Montserrat"}}>Vehicle Vault</span>
            </Link>
          
          
        </div>

        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        >
          <nav className="mt-2">
            
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                {/* <a href="#" className="nav-link active"> */}
                  <Link to={"/usersidebar/profile"} className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    My Dashboard
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                  </Link>
                {/* </a> */}
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to={"/usersidebar/sellcar"} className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Sell Now</p>
                      </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/usersidebar/mycars"} className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>My Cars</p>
                      </Link>
                  </li>
                  <li className="nav-item">
                  <Link to={"/usersidebar/comparecars"} className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Compare Cars</p>
                      </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
              <Link to={"/usersidebar/message"} className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Messages</p>
                      </Link>
              </li>
              <li className="nav-item">
              <Link to={"/usersidebar/mywishlist"} className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>My Wishlist</p>
                      </Link>
              </li>
              <li className="nav-item">
                {/* <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Widgets
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a> */}
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./widgets/small-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Small Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/info-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>info Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/cards.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Cards</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            
          </nav>
        </div>
      </aside>

            

      <main class="app-main">
        <Outlet></Outlet>
      </main>


    </>
  )
}

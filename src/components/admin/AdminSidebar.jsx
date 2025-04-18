import React from 'react'
import { AdminNavbar } from './AdminNavbar'
import { Link, Outlet } from 'react-router-dom'
import { UserProfile } from '../user/UserProfile'
import logo from "../image/V.png"

export const AdminSidebar = () => {
  return (
    <>
        
        <AdminNavbar></AdminNavbar>
        <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          
          
          <Link to={"/adminsidebar/welcome"} className="brand-link">
            
            <img
              src={logo}
              alt=""
              style={{borderRadius:"20%"}}
              className="brand-image opacity-90 shadow"
            />
            
            <span className="brand-text fw-light" style={{fontFamily:"Montserrat"}}>Admin Panel</span>
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
                  <Link to={"/adminsidebar/dashboard"} className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    My Dashboard
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                  </Link>
                {/* </a> */}
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to={"/adminsidebar/cartable"} className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Manage Cars</p>
                      </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/adminsidebar/usertable"} className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Manage User</p>
                      </Link>
                  </li>
                  <li className="nav-item">
                  <Link to={"/adminsidebar/addstate"} className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Add State</p>
                      </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
              <Link to={"/adminsidebar/addcity"} className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Add City</p>
                      </Link>
              </li>
              <li className="nav-item">
              <Link to={"/adminsidebar/addarea"} className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Add Area</p>
                      </Link>

                      <li className="nav-item">
              <Link to={"/adminsidebar/query"} className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>User Queries</p>
                      </Link>
              </li>
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

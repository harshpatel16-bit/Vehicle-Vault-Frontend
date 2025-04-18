import React from "react";
import { Navbar } from "./Navbar";
import car from "../image/hero suv.jpg"
import cardeal from "../image/dignity.jpg"

import { Link } from "react-router-dom";


const AboutUs = () => {
  return (

  <> 
  
   <Navbar></Navbar>
   <div style={{marginTop:"80px"}}>
      {/* Hero Section */}
      <div className="container-fluid bg-dark text-white py-5 text-center">
        <h1 className="display-4 fw-bold">About Vehicle Vault</h1>
        <p className="lead">Your ultimate destination to buy, sell & compare cars – all in one place.</p>
      </div>

      {/* Who We Are */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4">
            <img
              src={car}
              className="img-fluid rounded shadow"
              alt="About our platform"
            />
          </div>
          <div className="col-md-6">
            <h3 className="mb-3">Who We Are</h3>
            <p className="text-muted">
              At <strong>Vehicle Vault</strong>, we are passionate about making your car journey effortless.
              Whether you’re buying your first car, selling your current one, or just comparing specs,
              our platform offers everything you need with ease, speed, and clarity.
            </p>
            <p className="text-muted">
              From stylish sedans to powerful SUVs, we’ve created a seamless experience with a user-first approach.
              Our goal is to empower you with information, images, and tools to make the best choice for your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container my-5">
        <div className="row align-items-center flex-md-row-reverse">
          <div className="col-md-6 mb-4">
            <img
              src={cardeal}
              className="img-fluid rounded shadow"
              alt="Our mission"
            />
          </div>
          <div className="col-md-6">
            <h3 className="mb-3">Our Mission</h3>
            <p className="text-muted">
              Our mission is to build a reliable, easy-to-use, and tech-savvy platform that brings transparency
              to the car trading market. We aim to become the most trusted car portal in the country by offering
              authentic listings, intuitive tools, and exceptional customer support.
            </p>
          </div>
        </div>
      </div>

      {/* Meet the Owner */}
      <div className="container text-center my-5">
        <h3 className="mb-3">Meet the Owner</h3>
        <img
          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
          className="rounded-circle shadow"
          alt="Owner Harsh Patel"
          style={{ width: "150px", height: "150px", objectFit: "cover", marginBottom: "10px" }}
        />
        <h5 className="fw-bold">Harsh Patel</h5>
        <p className="text-muted">Founder & Owner, Vehicle Vault</p>
      </div>

      {/* Footer */}
      <div className="container-fluid bg-light text-center text-muted py-3">
        <p>© 2025 Vehicle Vault. All rights reserved.</p>
      </div>
    </div>
    </>
  );
};

export default AboutUs;

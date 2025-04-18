import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const Home = () => {

  const [cars, setcars] = useState([]);


  const getAllCars = async () => {
    const res = await axios.get(
      "/car/getallcars/"
    );
    console.log(res.data);
    setcars(res.data.data);
  };

  useEffect(() => {
    getAllCars();
  }, []);


















  return (
    <>
      <Navbar></Navbar>
      <div
        style={{
          fontFamily: '"Montserrat", serif',
          marginTop: "80px",
          width: "100%",
        }}
      > <hr />
        <h2 style={{ padding: "0px 30px", textAlign: "center"}}>
        Explore Your Car – Find, Compare & Choose the Best!"
        </h2> <hr />
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            maxWidth: "100%",
            boxSizing: "border-box",
            padding: "0px 30px",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          

          {cars?.map((car) => {
            return (
                        <div className="card" style={{ width: "18rem", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                              <img src={car.carURL} className="card-img-top" alt={car.model} style={{ height: "200px", objectFit: "cover" }}/> 
                              <div className="card-body"  style={{ flex: "1" }}>
                                <h5 className="card-title">
                                  <b>{car.companyName} {car.model}</b>
                                </h5><br />
                                <p className="card-text">
                                  Year: {car.year} | Price: ₹{car.price}
                                  <br />
                                  Fuel: {car.fuelType} | Transmission: {car.transmissionType}
                                  <br />
                                  Mileage: {car.mileage} km/l
                                  <br />
                                  {car.description}
                                </p>
                              </div>
                                <div className="card-footer text-center" >
                                  <Link to={"/login"} className="btn btn-primary">
                                    Explore
                                  </Link>
                                </div>
                              
                            </div>

                  );
                  })}















         
          

          
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompareCars = () => {
  const navigate = useNavigate();
   if(!(localStorage.getItem("id"))){
          navigate('/login');
      }
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const storedIds = JSON.parse(localStorage.getItem("compareCars")) || [];

      if (storedIds.length === 0) return;

      try {
        const responses = await Promise.all(
          storedIds.map((id) => axios.get("/car/getcarbyid/" + id))
        );
        const carsData = responses.map((res) => res.data.data);
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);


  const handleRemove = (carId) => {
    // Remove from localStorage
    const storedIds = JSON.parse(localStorage.getItem("compareCars")) || [];
    const updatedIds = storedIds.filter((id) => id !== carId);
    localStorage.setItem("compareCars", JSON.stringify(updatedIds));

    // Remove from local state
    setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
  };

  if (cars.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>No cars selected for comparison.</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Compare Cars</h2>
      <div className="row">
        {cars.map((car, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card shadow border-0 rounded-4 h-100">
              <img
                src={car.carURL}
                className="card-img-top rounded-top-4"
                alt={car.model}
                style={{ height: "320px", objectFit: "cover" }} // 🆙 Increased height here
              />
              <div className="card-body">
                <h5 className="card-title">
                  {car.companyName} - {car.model}
                </h5> <br /><hr />
                <p className="card-text"><strong>Year:</strong> {car.year}</p> {/* 🪄 Year on a new line */}
                <p className="card-text"><strong>Price:</strong> ₹{car.price.toLocaleString()}</p>
                <p className="card-text"><strong>Fuel Type:</strong> {car.fuelType}</p>
                <p className="card-text"><strong>Transmission:</strong> {car.transmissionType}</p>
                <p className="card-text"><strong>Mileage:</strong> {car.mileage} km/l</p>
                <p className="card-text"><strong>Description:</strong> {car.description}</p>
              </div>
              <div className="text-center pb-3">
                <button
                  className="btn btn-danger px-4"
                  onClick={() => handleRemove(car._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareCars;

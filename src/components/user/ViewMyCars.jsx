import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";

export const ViewMyCars = () => {
   const navigate=useNavigate();
   if(!(localStorage.getItem("id"))){
        navigate('/login');
    }
  const [cars, setcars] = useState([]);


  const getAllMyCars = async () => {
    const res = await axios.get(
      "/car/getallcarsbyuserid/" + localStorage.getItem("id")
    );
    console.log(res.data);
    setcars(res.data.data);
  };

  useEffect(() => {
    getAllMyCars();
  }, []);


  // Function to delete a car

  const handleDelete = async (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`/car/deletecarbyid/${carId}`);

        // alert("Car deleted successfully!");
         swal.fire({
                    title: "success",
                    icon: "success",
                    text:"Car Deleted Successfully!!",
                    showConfirmButton: false,
                    timer:1500
        
                  });


        getAllMyCars(); // Refresh the car list
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("Failed to delete car!");
      }
    }
  };










  //End Of handleDelete
  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center mb-4">My Cars</h2>
        <div className="list-group">
          {cars?.map((car) => {
            return (
              <div>
                <div
                  className="list-group-item d-flex align-items-center"
                  style={{ margin: "5px 5px", boxShadow: "2px 3px 5px grey" }}
                >
                  <img
                    src={car?.carURL}
                    className="img-thumbnail me-3"
                    style={{ width: 150, height: "auto" }}
                    alt="Car Image"
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{car.model}</h5>
                    <p className="mb-1">
                      Year: {car.year} | Price: ₹{car.price}
                    </p>
                    <p className="mb-1">
                      Fuel Type: {car.fuelType} | Transmission:{" "}
                      {car.transmissionType}
                    </p>

                    <p className="mb-1">
                    Description: {car.description}
                    </p>




                  </div>
                   <Link to={"/usersidebar/updatemycar/"+car._id} className="btn btn-info" style={{marginRight:"15px",boxShadow: "2px 3px 3px grey"}}>Update</Link> 


                  <button className="btn btn-danger" style={{boxShadow: "2px 3px 3px grey"}} onClick={() => handleDelete(car._id)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

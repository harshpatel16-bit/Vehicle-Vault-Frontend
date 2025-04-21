import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert2";


const CarProfile = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  const [area, setArea] = useState(null);
  const navigate = useNavigate();

  const storedUserId = localStorage.getItem("id");


      // Handle adding car to wishlist
  const handleAddToWishlist = async () => {
    try {
      const response = await axios.put(
        `/wishlist/${storedUserId}`,
        { carId: id }
      );
       swal.fire({
              title: "Added",
              icon: "success",
              text: `${response.data.message}`,
              timer: 1500,
              showConfirmButton: false,
            });
      navigate("/usersidebar/mywishlist")
      // Success message from API
    } catch (error) {
      console.error("Error adding car to wishlist:", error);
      alert("There was an error adding the car to your wishlist.");
    }
  };






    //handle compare//
  const handleCompare = () => {
    const compareList = JSON.parse(localStorage.getItem("compareCars")) || [];
  
    // Avoid duplicates and limit comparison to 2 cars
    if (!compareList.includes(id) && compareList.length < 2) {
      compareList.push(id);
      localStorage.setItem("compareCars", JSON.stringify(compareList));
      swal.fire({
        title: "Added",
        icon: "success",
        text: "Car added for comparison!",
        timer: 1500,
        showConfirmButton: false,
      });

      if (compareList.length === 2) {
        navigate("/usersidebar/comparecars"); // ✅ Navigate when exactly 2 cars
      }
    } else if (compareList.includes(id)) {
      alert("Car already added for comparison!");
    } else {
      alert("You can only compare two cars at a time!");
    }
  };
  



  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get("/car/getcarbyid/" + id);
        setCar(response.data.data);
        console.log(response.data.data);
        if (response.data.data.userId) {
            fetchUserDetails(response.data.data.userId);
          }
          if (response.data.data.areaId) {
            fetchAreaDetails(response.data.data.areaId);
          }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    const fetchUserDetails = async (userId) => {
        try {
          const userResponse = await axios.get("/user/"+userId);
          setUser(userResponse.data.data);
          console.log(userResponse.data.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };


      const fetchAreaDetails = async (areaId) => {
        try {
          const areaResponse = await axios.get("/area/getareabyid/" + areaId);
          setArea(areaResponse.data.data);
          console.log(areaResponse.data.data);
        } catch (error) {
          console.error("Error fetching area details:", error);
        }
      };

   




    fetchCarDetails();
  }, [id]);

  if (!car || !user || !area) {
    return (
      <div className="container mt-5 text-center">Loading car details...</div>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={
                  car.carURL ||
                  "https://www.financialexpress.com/auto/images/creta-full-details-1724230801424.jpg"
                }
                className="img-fluid rounded-start car-image"
                alt={car.model}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h2 className="card-title">
                  <strong>{car.model}</strong>
                </h2>{" "}
                <br /> <hr />
                <p className="card-text">
                  <strong>Brand:</strong> {car.companyName}
                </p>
                {/* <p className="card-text"><strong>Model:</strong> {car.model}</p> */}
                <p className="card-text">
                  <strong>Year:</strong> {car.year}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ₹{car.price}/-
                </p>
                <p className="card-text">
                  <strong>Fuel Type:</strong> {car.fuelType}
                </p>
                <p className="card-text">
                  <strong>Mileage:</strong> {car.mileage} km/l
                </p>
                <p className="card-text">
                  <strong>Transmission:</strong> {car.transmissionType}
                </p>
                <p className="card-text">
                  <strong>Description:</strong> {car.description}
                </p>
                {storedUserId === car.userId ? (
                  // <button className="btn btn-warning">Update Car</button>
                  <Link className="btn btn-warning" to={"/usersidebar/updatemycar/"+id}>Update Car</Link>
                ) : (
                  <>
                    <button className="btn btn-primary">
                      
                      <Link to={"/usersidebar/message/"+car.userId} style={{color:"white", textDecoration:"none"}}>Let's Deal</Link>
                    </button>
                    <button className="btn btn-secondary ms-2" onClick={handleAddToWishlist}>
                      Add to Wishlist
                    </button> &nbsp;
                    <button className="btn btn-success" onClick={handleCompare}>
                      Compare
                    </button>
                  </>
                )}
                &nbsp;

                
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Information Card */}
      <div className="container" style={{ marginTop: "15px",display:"flex",alignItems:"centre"}}>
        <div
          className="card shadow-lg p-3 d-flex flex-row align-items-center w-100"
          style={{ borderRadius: 10,display:"flex",justifyContent:"centre"}}
        >
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              alt="User Icon"
              className="me-3 rounded-circle"
              style={{ width: 60, height: 60 }}
            />
            <div className="me-4">
              <h5 className="mb-1">{user.userName}</h5>
              <p className="text-muted mb-0">{user.email}</p>
            </div>
           
          </>
                   &nbsp; &nbsp; 
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="Location Icon"
            className="me-3"
            style={{ width: 50, height: 50 }}
          />
          <div>
            <h5 className="mb-2">Location</h5>
            <p className="mb-1">
              <strong>State:</strong> {area.stateId?.name || "N/A"}
            </p>
            <p className="mb-1">
              <strong>City:</strong> {area.cityId?.name || "N/A"}
            </p>
            <p className="mb-0">
              <strong>Area:</strong>  {area.name || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarProfile;

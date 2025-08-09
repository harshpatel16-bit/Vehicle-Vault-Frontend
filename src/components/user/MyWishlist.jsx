import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const MyWishlist = () => {
  const navigate = useNavigate();
   if(!(localStorage.getItem("id"))){
          navigate('/login');
      }
  const [wishlistCars, setWishlistCars] = useState([]);
  const userId = localStorage.getItem("id");

  // Fetch user and then fetch all cars in wishlist
  const fetchWishlistCars = async () => {
    try {
      const userRes = await axios.get(`/user/${userId}`);
      const wishlist = userRes.data.data.wishlist || [];

      const carPromises = wishlist.map((carId) =>
        axios.get(`/car/getcarbyid/${carId}`).then((res) => res.data.data)
      );

      const cars = await Promise.all(carPromises);
      setWishlistCars(cars);
    } catch (error) {
      console.error("Error fetching wishlist cars:", error);
    }
  };

  useEffect(() => {
    fetchWishlistCars();
  }, []);

  // Remove car from wishlist
  const handleRemove = async (carId) => {
    try {
      await axios.delete(`/removewishlist/${userId}/${carId}`);
  
      swal.fire({
        title: "Removed",
        icon: "success",
        text: "Car removed from wishlist!",
        timer: 1500,
        showConfirmButton: false,
      });
  
      fetchWishlistCars(); // Refresh the list
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      swal.fire("Error", "Failed to remove car from wishlist", "error");
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Wishlist</h2>
      {wishlistCars.length === 0 ? (
        <div className="text-center">Your wishlist is empty.</div>
      ) : (
        <div className="list-group">
          {wishlistCars.map((car) => (
            <div
              key={car._id}
              className="list-group-item d-flex align-items-center"
              style={{ margin: "5px 5px", boxShadow: "2px 3px 5px grey" }}
            >
              <img
                src={car.carURL}
                className="img-thumbnail me-3"
                style={{ width: 150, height: "auto" }}
                alt="Car"
              />
              <div className="flex-grow-1">
                <h5 className="mb-1">{car.model}</h5>
                <p className="mb-1">
                  Year: {car.year} | Price: ₹{car.price}
                </p>
                <p className="mb-1">
                  Fuel Type: {car.fuelType} | Transmission: {car.transmissionType}
                </p>
                <p className="mb-1">Description: {car.description}</p>
              </div>
              <Link
                to={`/usersidebar/carprofile/${car._id}`}
                className="btn btn-info me-2"
                style={{ boxShadow: "2px 3px 3px grey" }}
              >
                View
              </Link>
              <button
                className="btn btn-danger"
                style={{ boxShadow: "2px 3px 3px grey" }}
                onClick={() => handleRemove(car._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;

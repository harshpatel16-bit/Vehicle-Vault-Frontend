import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";

export const UpdateMyCar = () => {
  const { id } = useParams(); // Get car ID from URL
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    getCarDetails();
  }, []);

  const getCarDetails = async () => {
    try {
      const res = await axios.get("/car/getcarbyid/"+id);
      const car = res.data.data;

      // Auto-fill form fields
      setValue("year", car.year);
      setValue("price", car.price);
      setValue("fuelType", car.fuelType);
      setValue("transmissionType", car.transmissionType);
      setValue("description",car.description);
      
      
    } catch (error) {
      console.error("Error fetching car details:", error);
      alert("Failed to load car details!");
    }
  };

  const onSubmit = async (data) => {
    try {

      




      await axios.put("/car/updatecar/"+id, data);

      // alert("Car updated successfully!");
      swal.fire({
        title: "success",
        icon: "success",
        text:"Car updated successfully!",
        timer: 1500,
        showConfirmButton: false

      });


      navigate("/usersidebar/mycars"); // Redirect to the My Cars page
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Failed to update car!");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update Car Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="shadow p-4 rounded">
        <div className="mb-3">
          <label className="form-label">Year</label>
          <input type="number" className="form-control" {...register("year")} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" {...register("price")} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Fuel Type</label>
          <select className="form-control" {...register("fuelType")} required>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Transmission Type</label>
          <select className="form-control" {...register("transmissionType")} required>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" className="form-control" {...register("description")} required />
        </div>


        






        <button type="submit" className="btn btn-success">Update Car</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/usersidebar/mycars")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

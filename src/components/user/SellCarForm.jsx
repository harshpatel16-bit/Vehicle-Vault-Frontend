import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { Navbar } from "./Navbar";

export const SellCarForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    model: "",
    year: "",
    price: "",
    fuelType: "",
    transmissionType: "",
    mileage: "",
    description: "",
    stateId: "",
    cityId: "",
    areaId: "",
  });

  const [carImage, setCarImage] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/login");
    }
    fetchStates();
  }, [navigate]);

  const fetchStates = async () => {
    try {
      const res = await axios.get("/state/getallstates");
      setStates(res.data.data);
    } catch (err) {
      console.error("Error fetching states", err);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const res = await axios.get("/city/getcitybystate/" + stateId);
      setCities(res.data.data);
      setAreas([]);
      setFormData((prev) => ({ ...prev, cityId: "", areaId: "" }));
    } catch (err) {
      console.error("Error fetching cities", err);
    }
  };

  const fetchAreas = async (cityId) => {
    try {
      const res = await axios.get("/area/getareabycity/" + cityId);
      setAreas(res.data.data);
      setFormData((prev) => ({ ...prev, areaId: "" }));
    } catch (err) {
      console.error("Error fetching areas", err);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "stateId") fetchCities(value);
    if (id === "cityId") fetchAreas(value);
  };

  const handleFileChange = (e) => {
    setCarImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carImage) {
      setStatus("Please upload a car image.");
      return;
    }

    const userId = localStorage.getItem("id");

    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        dataToSend.append(key, val);
      });
      dataToSend.append("userId", userId);
      dataToSend.append("carURL", carImage);

      const res = await axios.post("/car/addcarwithfile", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      swal.fire({
        title: "Success",
        icon: "success",
        text: "Car added Successfully!!",
        showConfirmButton: false,
        timer: 1500,
      });

      setStatus("");
      navigate("/usersidebar/mycars");
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <div className="container mt-4">
          <h2 className="text-center mb-3">Sell Your Car</h2>
          <p className="text-center text-muted mb-4">
            Fill out the form below to list your car for sale.
          </p>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {[
                  {
                    label: "Company Name",
                    id: "companyName",
                    type: "text",
                    placeholder: "Enter company name",
                  },
                  { label: "Model", id: "model", type: "text", placeholder: "Enter model" },
                  { label: "Year", id: "year", type: "number", placeholder: "Enter year" },
                  { label: "Price", id: "price", type: "number", placeholder: "Enter price" },
                  { label: "Mileage (km/l)", id: "mileage", type: "number", placeholder: "Enter mileage" },
                ].map(({ label, id, type, placeholder }) => (
                  <div className="mb-3" key={id}>
                    <label htmlFor={id} className="form-label">
                      {label}
                    </label>
                    <input
                      type={type}
                      className="form-control"
                      id={id}
                      value={formData[id]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required
                    />
                  </div>
                ))}

                <div className="mb-3">
                  <label htmlFor="fuelType" className="form-label">
                    Fuel Type
                  </label>
                  <select
                    id="fuelType"
                    className="form-select"
                    value={formData.fuelType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="transmissionType" className="form-label">
                    Transmission Type
                  </label>
                  <select
                    id="transmissionType"
                    className="form-select"
                    value={formData.transmissionType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Transmission Type</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Semi-Automatic">Semi-Automatic</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter car description (optional)"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="stateId" className="form-label">
                    Select State
                  </label>
                  <select
                    id="stateId"
                    className="form-select"
                    value={formData.stateId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state._id} value={state._id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="cityId" className="form-label">
                    Select City
                  </label>
                  <select
                    id="cityId"
                    className="form-select"
                    value={formData.cityId}
                    onChange={handleChange}
                    required
                    disabled={!formData.stateId}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city._id} value={city._id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="areaId" className="form-label">
                    Select Area
                  </label>
                  <select
                    id="areaId"
                    className="form-select"
                    value={formData.areaId}
                    onChange={handleChange}
                    required
                    disabled={!formData.cityId}
                  >
                    <option value="">Select Area</option>
                    {areas.map((area) => (
                      <option key={area._id} value={area._id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="carImage" className="form-label">
                    Car Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="carImage"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </div>

                <div className="d-grid gap-2 mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Sell Car
                  </button>
                </div>

                {status && (
                  <p className="text-center text-danger fw-semibold">{status}</p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="container mt-5 text-center text-muted">
          <p>© 2025 Vehicle Vault. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

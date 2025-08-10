import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

export const SellCarForm = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("id")) {
    navigate("/login");
  }

  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const [areas, setareas] = useState([]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setstates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("city/getcitybystate/" + id);
    setcities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycity/" + id);
    setareas(res.data.data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    const userId = localStorage.getItem("id");
    data.userId = userId;
    const formData = new FormData();

    formData.append("companyName", data.companyName);
    formData.append("model", data.model);
    formData.append("year", data.year);
    formData.append("price", data.price);
    formData.append("fuelType", data.fuelType);
    formData.append("transmissionType", data.transmissionType);
    formData.append("mileage", data.mileage);
    formData.append("description", data.description);
    formData.append("stateId", data.stateId);
    formData.append("cityId", data.cityId);
    formData.append("areaId", data.areaId);
    formData.append("userId", data.userId);
    formData.append("carURL", data.carURL[0]);

    const res = await axios.post("/car/addcarwithfile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    swal.fire({
      title: "Success",
      icon: "success",
      text: "Car added Successfully!!",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/usersidebar/mycars");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">Sell Your Car</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(submitHandler)} noValidate>
            {[
              { label: "Company Name", name: "companyName", type: "text", placeholder: "Enter company name", required: true },
              { label: "Model", name: "model", type: "text", placeholder: "Enter model", required: true },
              { label: "Year", name: "year", type: "number", placeholder: "Enter year", required: true },
              { label: "Price", name: "price", type: "number", placeholder: "Enter price", required: true },
              { label: "Mileage (km/l)", name: "mileage", type: "number", placeholder: "Enter mileage", required: true },
            ].map(({ label, name, type, placeholder, required }) => (
              <div className="mb-3" key={name}>
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                  placeholder={placeholder}
                  {...register(name, { required: required && `${label} is required` })}
                />
                <div className="invalid-feedback">{errors[name]?.message}</div>
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">Fuel Type</label>
              <select
                className={`form-select ${errors.fuelType ? "is-invalid" : ""}`}
                {...register("fuelType", { required: "Fuel type is required" })}
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <div className="invalid-feedback">{errors.fuelType?.message}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Transmission Type</label>
              <select
                className={`form-select ${errors.transmissionType ? "is-invalid" : ""}`}
                {...register("transmissionType", { required: "Transmission type is required" })}
              >
                <option value="">Select Transmission Type</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
              <div className="invalid-feedback">{errors.transmissionType?.message}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                placeholder="Enter car description"
                rows={3}
                {...register("description")}
              ></textarea>
              <div className="invalid-feedback">{errors.description?.message}</div>
            </div>

            {[
              { label: "Select State", name: "stateId", data: states, onChange: getCityByStateId },
              { label: "Select City", name: "cityId", data: cities, onChange: getAreaByCityId },
              { label: "Select Area", name: "areaId", data: areas, onChange: null },
            ].map(({ label, name, data, onChange }) => (
              <div className="mb-3" key={name}>
                <label className="form-label">{label}</label>
                <select
                  className={`form-select ${errors[name] ? "is-invalid" : ""}`}
                  {...register(name)}
                  onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                >
                  <option value="">{label}</option>
                  {data?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors[name]?.message}</div>
              </div>
            ))}

            <div className="mb-4">
              <label className="form-label">Car Image</label>
              <input
                type="file"
                className={`form-control ${errors.carURL ? "is-invalid" : ""}`}
                {...register("carURL", { required: "Image is required" })}
              />
              <div className="invalid-feedback">{errors.carURL?.message}</div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2">
              Sell Car
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

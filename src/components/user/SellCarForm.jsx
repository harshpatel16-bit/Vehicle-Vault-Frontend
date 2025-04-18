import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';


export const SellCarForm = () => {

     const [states, setstates] = useState([]);
     const [cities, setcities] = useState([]);
     const [areas, setareas] = useState([]);
     
     
     useEffect(() => {
        getAllStates();
      }, []);





     const getAllStates = async() => {
        const res = await axios.get("/state/getallstates");
     console.log(res.data);
     setstates(res.data.data);
     };

     const getCityByStateId = async (id) => {
        //api...
        const res = await axios.get("city/getcitybystate/" + id);
        console.log("city response...", res.data);
        setcities(res.data.data);
      };

      const getAreaByCityId = async (id) => {
        //alert(id)
        const res = await axios.get("/area/getareabycity/" + id);
        setareas(res.data.data);
      };








     













    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const submitHandler = async (data) => {

        const userId = localStorage.getItem("id")
        data.userId = userId;
        console.log(data.carURL[0]);
        const formData = new FormData();

            formData.append("companyName",data.companyName);
            formData.append("model",data.model);
            formData.append("year",data.year);
            formData.append("price",data.price);
            formData.append("fuelType",data.fuelType);
            formData.append("transmissionType",data.transmissionType);
            formData.append("mileage",data.mileage);
            formData.append("description",data.description);
            formData.append("stateId",data.stateId);
            formData.append("cityId",data.cityId);
            formData.append("areaId",data.areaId);
            formData.append("userId",data.userId);
            formData.append("carURL",data.carURL[0]);




















        const res= await axios.post("/car/addcarwithfile",formData);
        console.log(res);
        console.log(res.data);

        swal.fire({
            title: "success",
            icon: "success",
            text:"Car added Successfully!!",
            showConfirmButton: false,
            timer:1500

          });

        navigate("/usersidebar/mycars")
           
        // console.log(data);
    };

    return (
        <div style={{ width: '1200px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="row justify-content-center" style={{ width: '90%', marginTop: '30px' }}>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white text-center">
                            <h4>Sell Your Car</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="mb-3">
                                    <label className="form-label">Company Name</label>
                                    <input type="text" className="form-control" placeholder="Enter company name" {...register("companyName", { required: "Company name is required" })} />
                                    <span style={{ color: "red" }}>{errors.companyName?.message}</span>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Model</label>
                                    <input type="text" className="form-control" placeholder="Enter model" {...register("model", { required: "Model is required" })} />
                                    <span style={{ color: "red" }}>{errors.model?.message}</span>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Year</label>
                                    <input type="number" className="form-control" placeholder="Enter year" {...register("year", { required: "Year is required" })} />
                                    <span style={{ color: "red" }}>{errors.year?.message}</span>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input type="number" className="form-control" placeholder="Enter price" {...register("price", { required: "Price is required" })} />
                                    <span style={{ color: "red" }}>{errors.price?.message}</span>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Fuel Type</label>
                                    <select className="form-control" {...register("fuelType", { required: "Fuel type is required" })}>
                                        <option value="">Select Fuel Type</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                    <span style={{ color: "red" }}>{errors.fuelType?.message}</span>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Transmission Type</label>
                                    <select className="form-control" {...register("transmissionType", { required: "Transmission type is required" })}>
                                        <option value="">Select Transmission Type</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Semi-Automatic">Semi-Automatic</option>
                                    </select>
                                    <span style={{ color: "red" }}>{errors.transmissionType?.message}</span>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Mileage (km/l)</label>
                                    <input type="number" className="form-control" placeholder="Enter mileage" {...register("mileage", { required: "Mileage is required" })} />
                                    <span style={{ color: "red" }}>{errors.mileage?.message}</span>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" placeholder="Enter car description" {...register("description")}></textarea>
                                    <span style={{ color: "red" }}>{errors.description?.message}</span>

                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Select State</label>
                                    <select
                                                {...register("stateId")}
                                                onChange={(event) => {
                                                getCityByStateId(event.target.value);
                                                }} className="form-control">
                                            
                                                <option>Select State</option>
                                                {states?.map((state) => {
                                                return <option value={state._id}>{state.name}</option>;
                                                })}
                                            </select>                                   
                                             <span style={{ color: "red" }}>{errors.stateId?.message}</span>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Select City</label>
                                    <select
                                            {...register("cityId")}
                                            onChange={(event) => {
                                            getAreaByCityId(event.target.value);
                                            }} className="form-control">
                                        
                                            <option>Select City</option>
                                            {cities?.map((city) => {
                                            return <option value={city._id}>{city.name}</option>;
                                            })}
                                        </select>
                                    <span style={{ color: "red" }}>{errors.cityId?.message}</span>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Select Area</label>
                                    <select {...register("areaId")} className="form-control">
                                            <option>Select Area</option>
                                            {areas?.map((area) => {
                                            return <option value={area._id}>{area.name}</option>;
                                            })}
                                        </select>
                                    <span style={{ color: "red" }}>{errors.areaId?.message}</span>
                                </div>

                                {/* Car Image Field */}


                                <div className="mb-3">
                                    <label className="form-label">Car Image</label>
                                    <input type="file" className="form-control" placeholder="Enter car image" {...register("carURL", { required: "Image is required" })} />
                                </div>



                                {/* End Of Car Image Field */}

                                <button type="submit" className="btn btn-primary w-100">Sell Car</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

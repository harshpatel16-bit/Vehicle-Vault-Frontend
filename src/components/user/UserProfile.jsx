import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Button } from '@mui/material';



export const UserProfile = () => {

  const [cars, setcars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);




  const getAllCars = async () => {
    const res = await axios.get(
      "/car/getallcars/"
    );
    console.log(res.data);
    setcars(res.data.data);
    setFilteredCars(res.data.data);
  };

  useEffect(() => {
    getAllCars();
  }, []);



  const handleSearch = () => {
    const filtered = cars.filter((car) =>
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
      car.companyName.toLowerCase().includes(searchTerm.toLowerCase())

    );
    setFilteredCars(filtered.length > 0 || searchTerm ? filtered : cars);
  };



  return (
    <>
        <div style={{padding:"10px 10px",fontFamily:"Montserrat",display:"flex",justifyContent:"center"}}>
           
                <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem",margin:"0px 5px"}}>
                        <div className="card-header"><b>Sell Your Car</b></div>
                        <div className="card-body">
                            <p className="card-text">
                            List your car with details like brand, model, year, price, and mileage.  
                            Upload high-quality images, connect with buyers, and sell hassle-free!    </p>
                            <button type="button" class="btn btn-success"><Link style={{textDecoration:"none",color:"white"}} to="/usersidebar/sellcar">Sell Now</Link></button>

                        </div>
                        
                </div>



                <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem",margin:"0px 5px" }}>
                        <div className="card-header"><b>My Cars</b></div>
                        <div className="card-body">
                            <p className="card-text">
                            You can view all the cars you have uploaded for sale.Manage your listings efficiently and ensure your car gets the best visibility among buyers.   </p>
                            <button type="button" class="btn btn-success"><Link style={{textDecoration:"none",color:"white"}} to="/usersidebar/mycars">My Cars</Link></button>

                        </div>
                        
                </div>


                



                <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem",margin:"0px 5px" }}>
                        <div className="card-header"><b>Compare Cars</b></div>
                        <div className="card-body">
                            <p className="card-text">
                            It allows you to effortlessly compare multiple vehicles based on various specifications and features. side-by-side comparison of essential details.
                            </p>
                            

                            <button type="button" class="btn btn-success"><Link style={{textDecoration:"none",color:"white"}} to="/usersidebar/comparecars">Compare</Link></button>
                            
                        </div>
                        
                </div>




                

    

        </div>

        <hr />


        <h2 style={{ padding: "0px 30px", textAlign: "center"}}>
        Explore Your Car – Find, Compare & Choose the Best!"
        </h2> <hr />

        {/* Search bar */}
      <div style={{ padding: '10px 30px', display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Search Car"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '800px' }}
        />
        <Button variant="contained" onClick={handleSearch} color="primary">
          Search
        </Button>
      </div>




      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          maxWidth: '100%',
          boxSizing: 'border-box',
          padding: '0px 30px',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car._id} className="card" style={{ width: '18rem', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <img src={car.carURL} className="card-img-top" alt={car.model} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body" style={{ flex: '1' }}>
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
              <div className="card-footer text-center">
                <Link to={`/usersidebar/carprofile/${car._id}`} className="btn btn-primary">
                  Explore
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No cars found.</p>
        )}
      </div>
























        {/* <div
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
                                          <Link to={`/usersidebar/carprofile/${car._id}`} className="btn btn-primary">
                                            Explore
                                          </Link>
                                        </div>
                                      
                                    </div>
        
                          );
                          })}
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
                 
                  
        
                  
                </div> */}


    </>
  )
}

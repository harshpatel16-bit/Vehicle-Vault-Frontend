import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField, Button, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText,
  OutlinedInput, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

export const UserProfile = () => {
  const navigate = useNavigate();
  if (!(localStorage.getItem("id"))) {
    navigate('/login');
  }

  const [cars, setcars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const getAllCars = async () => {
    const res = await axios.get("/car/getallcars/");
    setcars(res.data.data);
    setFilteredCars(res.data.data);
  };

  useEffect(() => {
    getAllCars();
  }, []);

  const uniqueBrands = [...new Set(cars.map(car => car.companyName))];

  const handleSearch = () => {
    let filtered = [...cars];
    if (searchTerm) {
      filtered = filtered.filter((car) =>
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(car => selectedBrands.includes(car.companyName));
    }
    if (minPrice || maxPrice) {
      filtered = filtered.filter(car => {
        const price = parseInt(car.price);
        return (
          (!minPrice || price >= parseInt(minPrice)) &&
          (!maxPrice || price <= parseInt(maxPrice))
        );
      });
    }
    setFilteredCars(filtered);
    setDialogOpen(false);
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .top-cards {
              flex-direction: column;
              align-items: center;
            }
            .top-cards .card {
              width: 90% !important;
            }
            .search-filter-container {
              flex-direction: column;
              align-items: stretch;
            }
            .search-filter-container button {
              width: 100%;
            }
            .car-card {
              width: 100% !important;
            }
          }
          @media (max-width: 480px) {
            h2 {
              font-size: 1.2rem;
            }
            .card-text {
              font-size: 0.9rem;
            }
          }
        `}
      </style>

      {/* Top Cards */}
      <div className="top-cards" style={{ padding: "10px", fontFamily: "Montserrat", display: "flex", justifyContent: "center", flexWrap: 'wrap', gap: '10px' }}>
        <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem", flex: '1 1 250px' }}>
          <div className="card-header"><b>Sell Your Car</b></div>
          <div className="card-body">
            <p className="card-text">List your car with details like brand, model, year, price, and mileage. Upload high-quality images, connect with buyers, and sell hassle-free!</p>
            <button type="button" className="btn btn-success">
              <Link style={{ textDecoration: "none", color: "white" }} to="/usersidebar/sellcar">Sell Now</Link>
            </button>
          </div>
        </div>

        <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem", flex: '1 1 250px' }}>
          <div className="card-header"><b>My Cars</b></div>
          <div className="card-body">
            <p className="card-text">You can view all the cars you have uploaded for sale. Manage your listings efficiently and ensure your car gets the best visibility among buyers.</p>
            <button type="button" className="btn btn-success">
              <Link style={{ textDecoration: "none", color: "white" }} to="/usersidebar/mycars">My Cars</Link>
            </button>
          </div>
        </div>

        <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem", flex: '1 1 250px' }}>
          <div className="card-header"><b>Compare Cars</b></div>
          <div className="card-body">
            <p className="card-text">It allows you to effortlessly compare multiple vehicles based on various specifications and features. Side-by-side comparison of essential details.</p>
            <button type="button" className="btn btn-success">
              <Link style={{ textDecoration: "none", color: "white" }} to="/usersidebar/comparecars">Compare</Link>
            </button>
          </div>
        </div>

        <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem", flex: '1 1 250px' }}>
          <div className="card-header"><b>Virtual Showroom</b></div>
          <div className="card-body">
            <p className="card-text">A Virtual Showroom Experience in collaboration with trusted car showroom. Users will also be able to book their car directly through Vehicle Vault.</p>
            <button type="button" className="btn btn-success" disabled>
              Upcoming
            </button>
          </div>
        </div>
      </div>

      <hr />
      <h2 style={{ textAlign: "center" }}>Explore Your Car – Find, Compare & Choose the Best!</h2>
      <hr />

      {/* Search & Filter */}
      <div className="search-filter-container" style={{ padding: '10px 30px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Search Car"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: '1 1 300px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => { setDialogOpen(true); setSearchTerm(''); }}>
          Filter
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Filter Cars</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '10px' }}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel>Car Brands</InputLabel>
            <Select
              multiple
              value={selectedBrands}
              onChange={(e) => setSelectedBrands(e.target.value)}
              input={<OutlinedInput label="Car Brands" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {uniqueBrands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  <Checkbox checked={selectedBrands.includes(brand)} />
                  <ListItemText primary={brand} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField label="Min Price" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          <TextField label="Max Price" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDialogOpen(false); setSelectedBrands([]); setMinPrice(''); setMaxPrice(''); }} color="error">Cancel</Button>
          <Button onClick={handleSearch} color="primary" variant="contained">Apply Filters</Button>
        </DialogActions>
      </Dialog>

      {/* Car Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', padding: '0px 30px' }}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car._id} className="card car-card" style={{ width: '18rem', minHeight: '400px', flex: '1 1 250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <img src={car.carURL} className="card-img-top" alt={car.model} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body" style={{ flex: '1' }}>
                <h5 className="card-title"><b>{car.companyName} {car.model}</b></h5><br />
                <p className="card-text">
                  Year: {car.year} | Price: ₹{car.price}<br />
                  Fuel: {car.fuelType} | Transmission: {car.transmissionType}<br />
                  Mileage: {car.mileage} km/l<br />
                  {car.description}
                </p>
              </div>
              <div className="card-footer text-center">
                <Link to={`/usersidebar/carprofile/${car._id}`} className="btn btn-primary">Explore</Link>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No cars found.</p>
        )}
      </div>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, IconButton, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const CarTable = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('username');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get('/car/getallcars');
      setCars(res.data.data || []);
      console.log(res.data.data);
    } catch (error) {
      console.error('Error fetching cars', error);
    }
  };

  const handleDelete = async (carId) => {
    try {
      const res = await axios.delete("/car/deletecarbyid/"+carId);
      console.log(res.data.message);
      fetchCars(); // Refresh the car list
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const filteredCars = cars.filter((car) => {
    const userName = car.userId?.userName?.toLowerCase() || '';
    const companyName = car.companyName?.toLowerCase() || '';
    const model = car.model?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();
  
    return userName.includes(term) || companyName.includes(term) || model.includes(term);
  });
  

  const sortedCars = [...filteredCars].sort((a, b) => {
    const aVal = a.userId?.userName || '';
    const bVal = b.userId?.userName || '';
    return sortOrder === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <Paper sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
      Car Management
      </Typography>
      <TextField
        label="Search Here"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={handleSortToggle} sx={{ cursor: 'pointer' }}>
                User Name ⬍
              </TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCars.map((car) => (
              <TableRow key={car._id}>
                <TableCell>{car.userId?.userName}</TableCell>
                <TableCell>{car.userId?._id}</TableCell>
                <TableCell>{car.companyName}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(car._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {sortedCars.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CarTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { AddLocation } from '@mui/icons-material';

const AddCityPage = () => {
  const [open, setOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cityName, setCityName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all states
  const fetchStates = async () => {
    try {
      const res = await axios.get('/state/getallstates');
      setStates(res.data.data);
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  };

  // Fetch all cities
  const fetchCities = async () => {
    try {
      const res = await axios.get('/city/getallcities');
      setCities(res.data.data);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  // Add city
  const handleAddCity = async () => {
    try {
      const newCity = { name: cityName, stateId: selectedState };
      const res = await axios.post('/city/addcity', newCity);
      setCities((prev) => [...prev, res.data.data]);
      setCityName('');
      setSelectedState('');
      setOpen(false);
    } catch (err) {
      console.error('Error adding city:', err);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchCities();
  }, []);

  // Filter cities by city name or state name using single search query
  const filteredCities = cities.filter((city) => {
    const cName = city.name.toLowerCase();
    const sName = city.stateId?.name?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    return cName.includes(query) || sName.includes(query);
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Manage Cities
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddLocation />}
        onClick={() => setOpen(true)}
        sx={{ mb: 3, borderRadius: '20px', padding: '10px 20px' }}
      >
        Add New City
      </Button>

      {/* Dialog for Adding City */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        PaperProps={{
          sx: {
            position: 'absolute',
            top: '50%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <DialogTitle>Add New City</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Select State"
            fullWidth
            margin="dense"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {states.map((state) => (
              <MenuItem key={state._id} value={state._id}>
                {state.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="City Name"
            fullWidth
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddCity}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Single Search Field */}
      <Box mb={3} width="100%">
        <TextField
          fullWidth
          label="Search by City or State Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* City Table */}
      <TableContainer component={Paper} sx={{ maxWidth: '100vw' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>City Name</strong></TableCell>
              <TableCell><strong>State Name</strong></TableCell>
              <TableCell><strong>City ID</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCities.map((city) => (
              <TableRow key={city._id}>
                <TableCell>{city.name}</TableCell>
                <TableCell>{city.stateId?.name || 'Unknown'}</TableCell>
                <TableCell>{city._id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddCityPage;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const AddAreaPage = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [areaName, setAreaName] = useState("");
  const [pincode, setPincode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStates();
    fetchAreas();
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState);
    }
  }, [selectedState]);

  const fetchStates = async () => {
    try {
      const res = await axios.get("/state/getallstates");
      setStates(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const res = await axios.get("/city/getcitybystate/" + stateId);
      setCities(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAreas = async () => {
    try {
      const res = await axios.get("/area/getallareas");
      setAreas(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddArea = async () => {
    try {
      const body = {
        name: areaName,
        cityId: selectedCity,
        stateId: selectedState,
        pincode: parseInt(pincode),
      };
      await axios.post("/area/addarea", body);
      setAreaName("");
      setPincode("");
      fetchAreas();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAreas = areas.filter((area) => {
    const query = searchQuery.toLowerCase();
    return (
      area.name.toLowerCase().includes(query) ||
      area.cityId?.name?.toLowerCase().includes(query) ||
      area.stateId?.name?.toLowerCase().includes(query) ||
      String(area.pincode).includes(query)
    );
  });

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>
        Add New Area
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select State</InputLabel>
        <Select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          label="Select State"
        >
          {states.map((state) => (
            <MenuItem key={state._id} value={state._id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select City</InputLabel>
        <Select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          label="Select City"
          disabled={!selectedState}
        >
          {cities.map((city) => (
            <MenuItem key={city._id} value={city._id}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Area Name"
        fullWidth
        sx={{ mb: 2 }}
        value={areaName}
        onChange={(e) => setAreaName(e.target.value)}
      />

      <TextField
        label="Pincode"
        fullWidth
        sx={{ mb: 2 }}
        value={pincode}
        type="number"
        onChange={(e) => setPincode(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleAddArea}>
        Add Area
      </Button>

      <TextField
        label="Search by Area, City, State or Pincode"
        fullWidth
        sx={{ mt: 4, mb: 2 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Typography variant="h6" mt={2} mb={2}>
        All Areas
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Area Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Pincode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAreas.map((area) => (
              <TableRow key={area._id}>
                <TableCell>{area.name}</TableCell>
                <TableCell>{area.cityId?.name}</TableCell>
                <TableCell>{area.stateId?.name}</TableCell>
                <TableCell>{area.pincode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddAreaPage;

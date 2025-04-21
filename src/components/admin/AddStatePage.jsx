import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

const allIndianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const AddStatePage = () => {
  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [states, setStates] = useState([]);
  const [search, setSearch] = useState('');

  const fetchStates = async () => {
    try {
      const response = await axios.get('/state/getallstates');
      setStates(response.data.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const handleAddState = async () => {
    try {
      const response = await axios.post('/state/addstate', { name: selectedState });
      setStates((prev) => [...prev, response.data.data]);
      setSelectedState('');
      setOpen(false);
    } catch (error) {
      console.error('Error adding state:', error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(search.toLowerCase())
  );

  // Remove already added states from dropdown
  const availableStates = allIndianStates.filter(
    (stateName) => !states.some((s) => s.name.toLowerCase() === stateName.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Manage States
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        onClick={() => setOpen(true)}
        sx={{ mb: 3, borderRadius: '20px', padding: '10px 20px' }}
      >
        Add New State
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        PaperProps={{
          sx: {
            position: 'absolute',
            top: '50%',
            left: '57%',
            transform: 'translate(-50%, -50%)',
            m: 0,
          },
        }}
      >
        <DialogTitle>Select State to Add</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>State</InputLabel>
            <Select
              value={selectedState}
              label="State"
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {availableStates.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddState}
            disabled={!selectedState}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Box mb={3} width="100%">
        <TextField
          fullWidth
          label="Search State by Name"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper} sx={{ maxWidth: '100vw' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>State Name</strong></TableCell>
              <TableCell><strong>State ID</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStates.map((state) => (
              <TableRow key={state._id}>
                <TableCell>{state.name}</TableCell>
                <TableCell>{state._id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddStatePage;

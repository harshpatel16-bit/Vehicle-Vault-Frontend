import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

const AddStatePage = () => {
  const [open, setOpen] = useState(false);
  const [stateName, setStateName] = useState('');
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
      const response = await axios.post('/state/addstate', { name: stateName });
      setStates((prev) => [...prev, response.data.data]);
      setStateName('');
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

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4} >
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

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth PaperProps={{
    sx: {
      position: 'absolute',
      top: '50%',
      left: '57%',
      transform: 'translate(-50%, -50%)',
      m: 0, // Remove default margins
    },
  }}>
        <DialogTitle>Add New State</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="State Name"
            type="text"
            fullWidth
            variant="outlined"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddState}>Add</Button>
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
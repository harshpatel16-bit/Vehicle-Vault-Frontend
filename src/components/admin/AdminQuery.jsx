import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TableContainer,
  Alert,
  Button,
} from '@mui/material';

export const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQueries = async () => {
    try {
      const response = await axios.get('/query/getallqueries');
      setQueries(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load queries.');
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.delete("/query/deletequerybyid/"+id);
      setQueries((prev) => prev.filter((query) => query._id !== id));
    } catch (err) {
      console.error('Error deleting query:', err);
      setError('Failed to resolve query.');
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          User Queries
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Full Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white' }}>Subject</TableCell>
                  <TableCell sx={{ color: 'white' }}>Message</TableCell>
                  <TableCell sx={{ color: 'white' }}>Submitted At</TableCell>
                  <TableCell sx={{ color: 'white' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {queries.map((query) => (
                  <TableRow key={query._id}>
                    <TableCell>{query.fullName}</TableCell>
                    <TableCell>{query.email}</TableCell>
                    <TableCell>{query.subject}</TableCell>
                    <TableCell>{query.message}</TableCell>
                    <TableCell>
                      {new Date(query.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleResolve(query._id)}
                      >
                        Resolved
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default AdminQueries;

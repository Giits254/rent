import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Properties = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder data for properties
  const propertiesData = [
    {
      id: 1,
      name: '121 Main Street',
      type: 'Apartment',
      units: 4,
      address: '121 Main St, Cityville, ST 12345',
      status: 'Occupied',
      rent: '$1,200/month'
    },
    {
      id: 2,
      name: '456 Oak Avenue',
      type: 'House',
      units: 1,
      address: '456 Oak Ave, Townsville, ST 23456',
      status: 'Vacant',
      rent: '$2,400/month'
    },
    {
      id: 3,
      name: '789 Pine Street',
      type: 'Condo',
      units: 1,
      address: '789 Pine St, Villagetown, ST 34567',
      status: 'Occupied',
      rent: '$1,800/month'
    },
    {
      id: 4,
      name: '101 Elm Court',
      type: 'Apartment',
      units: 8,
      address: '101 Elm Ct, Hamletville, ST 45678',
      status: 'Partially Occupied',
      rent: '$950/month'
    },
    {
      id: 5,
      name: '202 Maple Drive',
      type: 'Townhouse',
      units: 1,
      address: '202 Maple Dr, Boroughton, ST 56789',
      status: 'Vacant',
      rent: '$2,100/month'
    },
  ];

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProperties = propertiesData.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>Properties</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add Property
        </Button>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search properties by name, address, or type..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Properties Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="properties table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Property Name</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Type</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Address</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Status</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Rent</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>{property.name}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>{property.address}</TableCell>
                <TableCell>
                  <Chip
                    label={property.status}
                    color={
                      property.status === 'Occupied' ? 'success' :
                      property.status === 'Vacant' ? 'error' : 'warning'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{property.rent}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Property Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Property</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Enter property details to add a new property to the system.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="Property Name"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                margin="dense"
                id="type"
                label="Property Type"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                margin="dense"
                id="units"
                label="Number of Units"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="address"
                label="Address"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                margin="dense"
                id="rent"
                label="Rent Amount"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                margin="dense"
                id="status"
                label="Status"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained">Add Property</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Properties;
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
  Avatar,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tabs,
  Tab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';

const Tenants = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);

  // Placeholder data for tenants
  const tenantsData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      property: '121 Main Street, Apt 2B',
      leaseStart: '01/15/2025',
      leaseEnd: '01/14/2026',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '(555) 987-6543',
      property: '456 Oak Avenue',
      leaseStart: '02/01/2025',
      leaseEnd: '01/31/2026',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      phone: '(555) 567-8901',
      property: '789 Pine Street, Unit 3',
      leaseStart: '03/01/2025',
      leaseEnd: '02/28/2026',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '(555) 234-5678',
      property: '101 Elm Court, Apt 5C',
      leaseStart: '09/15/2024',
      leaseEnd: '04/15/2025',
      status: 'Ending Soon'
    },
    {
      id: 5,
      name: 'Michael Wilson',
      email: 'michael.w@example.com',
      phone: '(555) 345-6789',
      property: '202 Maple Drive',
      leaseStart: '10/01/2024',
      leaseEnd: '03/31/2025',
      status: 'Past Due'
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredTenants = tenantsData.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase());

    if (tabValue === 0) return matchesSearch; // All tenants
    if (tabValue === 1) return matchesSearch && tenant.status === 'Active';
    if (tabValue === 2) return matchesSearch && tenant.status === 'Ending Soon';
    if (tabValue === 3) return matchesSearch && tenant.status === 'Past Due';
    return matchesSearch;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>Tenants</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add Tenant
        </Button>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search tenants by name, email, or property..."
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

      {/* Tabs for filtering */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Tenants" />
          <Tab label="Active" />
          <Tab label="Ending Soon" />
          <Tab label="Past Due" />
        </Tabs>
      </Paper>

      {/* Tenants Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tenants table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Tenant</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Contact</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Property</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Lease Period</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Status</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2 }}>{tenant.name.charAt(0)}</Avatar>
                    <Typography>{tenant.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{tenant.email}</Typography>
                  <Typography variant="body2" color="text.secondary">{tenant.phone}</Typography>
                </TableCell>
                <TableCell>{tenant.property}</TableCell>
                <TableCell>{`${tenant.leaseStart} - ${tenant.leaseEnd}`}</TableCell>
                <TableCell>
                  <Chip
                    label={tenant.status}
                    color={
                      tenant.status === 'Active' ? 'success' :
                      tenant.status === 'Ending Soon' ? 'warning' : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <EmailIcon fontSize="small" />
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

      {/* Add Tenant Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Tenant</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Enter tenant details to add a new tenant to the system.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="firstName"
                label="First Name"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                margin="dense"
                id="lastName"
                label="Last Name"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="phone"
                label="Phone Number"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="property"
                label="Property"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                margin="dense"
                id="leaseStart"
                label="Lease Start Date"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                margin="dense"
                id="leaseEnd"
                label="Lease End Date"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained">Add Tenant</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tenants;
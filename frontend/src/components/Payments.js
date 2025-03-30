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
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckIcon from '@mui/icons-material/Check';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Payments = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentPeriod, setPaymentPeriod] = useState('all');

  // Placeholder data for payments
  const paymentsData = [
    {
      id: 'PAY-20250315-001',
      tenant: 'John Doe',
      property: '121 Main Street, Apt 2B',
      amount: 1200.00,
      date: '2025-03-15',
      method: 'Credit Card',
      status: 'Completed'
    },
    {
      id: 'PAY-20250312-002',
      tenant: 'Jane Smith',
      property: '456 Oak Avenue',
      amount: 2400.00,
      date: '2025-03-12',
      method: 'Bank Transfer',
      status: 'Completed'
    },
    {
      id: 'PAY-20250310-003',
      tenant: 'Robert Johnson',
      property: '789 Pine Street, Unit 3',
      amount: 1800.00,
      date: '2025-03-10',
      method: 'Cash',
      status: 'Completed'
    },
    {
      id: 'PAY-20250401-004',
      tenant: 'Emily Davis',
      property: '101 Elm Court, Apt 5C',
      amount: 950.00,
      date: '2025-04-01',
      method: 'Credit Card',
      status: 'Pending'
    },
    {
      id: 'PAY-20250405-005',
      tenant: 'Michael Wilson',
      property: '202 Maple Drive',
      amount: 2100.00,
      date: '2025-04-05',
      method: 'Check',
      status: 'Overdue'
    },
  ];

  // Summary data
  const summaryData = {
    totalCollected: 5400.00,
    pendingPayments: 950.00,
    overduePayments: 2100.00,
    totalPayments: 8450.00
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setPaymentPeriod(event.target.value);
  };

  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());

    const currentMonth = new Date().getMonth() + 1;
    const paymentMonth = new Date(payment.date).getMonth() + 1;

    if (paymentPeriod === 'all') return matchesSearch;
    if (paymentPeriod === 'current') return matchesSearch && paymentMonth === currentMonth;
    if (paymentPeriod === 'pending') return matchesSearch && payment.status === 'Pending';
    if (paymentPeriod === 'overdue') return matchesSearch && payment.status === 'Overdue';
    return matchesSearch;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>Payments</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Record Payment
        </Button>
      </Box>

      {/* Payment Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalAtmIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Collected</Typography>
              </Box>
              <Typography variant="h4" color="primary">${summaryData.totalCollected.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CreditCardIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Pending</Typography>
              </Box>
              <Typography variant="h4" color="info">${summaryData.pendingPayments.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachMoneyIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="h6">Overdue</Typography>
              </Box>
              <Typography variant="h4" color="error">${summaryData.overduePayments.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ReceiptIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Total</Typography>
              </Box>
              <Typography variant="h4" color="success">${summaryData.totalPayments.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <TextField
          placeholder="Search payments..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: '40%' }}
        />
        <FormControl size="small" sx={{ width: '20%' }}>
          <InputLabel>Payment Period</InputLabel>
          <Select
            value={paymentPeriod}
            label="Payment Period"
            onChange={handlePeriodChange}
          >
            <MenuItem value="all">All Payments</MenuItem>
            <MenuItem value="current">Current Month</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="overdue">Overdue</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Payments Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Tenant</TableCell>
              <TableCell>Property</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.tenant}</TableCell>
                <TableCell>{payment.property}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <Chip
                    label={payment.status}
                    color={
                      payment.status === 'Completed' ? 'success' :
                      payment.status === 'Pending' ? 'info' : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" title="View Details">
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" title="Print Receipt">
                    <PrintIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Record Payment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Record New Payment</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Enter the payment details below.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tenant</InputLabel>
                <Select label="Tenant">
                  <MenuItem value="John Doe">John Doe</MenuItem>
                  <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                  <MenuItem value="Robert Johnson">Robert Johnson</MenuItem>
                  <MenuItem value="Emily Davis">Emily Davis</MenuItem>
                  <MenuItem value="Michael Wilson">Michael Wilson</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Property</InputLabel>
                <Select label="Property">
                  <MenuItem value="121 Main Street, Apt 2B">121 Main Street, Apt 2B</MenuItem>
                  <MenuItem value="456 Oak Avenue">456 Oak Avenue</MenuItem>
                  <MenuItem value="789 Pine Street, Unit 3">789 Pine Street, Unit 3</MenuItem>
                  <MenuItem value="101 Elm Court, Apt 5C">101 Elm Court, Apt 5C</MenuItem>
                  <MenuItem value="202 Maple Drive">202 Maple Drive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Amount"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select label="Payment Method">
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Check">Check</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>Record Payment</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payments;
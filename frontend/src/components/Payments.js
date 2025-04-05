import React, { useState } from 'react';
// Add these imports at the top of the file
import { fetchTransactions, confirmTransaction, generateReceipt } from './api';
import { useEffect } from 'react';
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
  Divider,
  CircularProgress,
  Alert,
  Snackbar
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
  // Replace the static summaryData with state
  const [summaryData, setSummaryData] = useState({
    totalCollected: 0,
    pendingPayments: 0,
    overduePayments: 0,
    totalPayments: 0
  });

  // State for payments data and UI states
  const [paymentsData, setPaymentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for notifications
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Add this useEffect to fetch transactions when component mounts
  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const transactions = await fetchTransactions();

        if (Array.isArray(transactions)) {
          setPaymentsData(transactions);

          // Calculate summary data from fetched transactions
          const completed = transactions
            .filter(t => t.status === 'COMPLETED')
            .reduce((sum, t) => sum + t.amount, 0);

          const pending = transactions
            .filter(t => t.status === 'PENDING')
            .reduce((sum, t) => sum + t.amount, 0);

          setSummaryData({
            totalCollected: completed,
            pendingPayments: pending,
            overduePayments: 0, // M-Pesa doesn't have overdue status
            totalPayments: completed + pending
          });
        } else {
          throw new Error('Invalid response format: expected an array of transactions');
        }

        setError(null);
      } catch (err) {
        console.error('Transaction loading error:', err);
        setError(`Failed to load transactions: ${err.message}`);

        // Set empty data on error
        setPaymentsData([]);
        setSummaryData({
          totalCollected: 0,
          pendingPayments: 0,
          overduePayments: 0,
          totalPayments: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Function to handle confirming a transaction
  const handleConfirmTransaction = async (transactionId) => {
    try {
      setLoading(true);
      await confirmTransaction(transactionId);

      // Refresh the transactions list after confirmation
      const updatedTransactions = await fetchTransactions();

      if (Array.isArray(updatedTransactions)) {
        setPaymentsData(updatedTransactions);

        // Recalculate summary data
        const completed = updatedTransactions
          .filter(t => t.status === 'COMPLETED')
          .reduce((sum, t) => sum + t.amount, 0);

        const pending = updatedTransactions
          .filter(t => t.status === 'PENDING')
          .reduce((sum, t) => sum + t.amount, 0);

        setSummaryData({
          totalCollected: completed,
          pendingPayments: pending,
          overduePayments: 0,
          totalPayments: completed + pending
        });
      }

      // Show success notification
      setNotification({
        open: true,
        message: 'Transaction confirmed successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error confirming transaction:', err);
      setNotification({
        open: true,
        message: `Error confirming transaction: ${err.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle generating a receipt
  const handleGenerateReceipt = async (transactionId) => {
    try {
      setLoading(true);
      const receipt = await generateReceipt(transactionId);
      console.log('Receipt generated:', receipt);

      // Show success notification
      setNotification({
        open: true,
        message: 'Receipt generated successfully',
        severity: 'success'
      });

      // TODO: Implement receipt display logic - could open a new dialog here
    } catch (err) {
      console.error('Error generating receipt:', err);
      setNotification({
        open: true,
        message: `Error generating receipt: ${err.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
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

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  // Filter payments based on search and period filters
  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch =
      payment.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.company_ref?.toLowerCase().includes(searchTerm.toLowerCase());

    const paymentDate = new Date(payment.transaction_time);
    const currentMonth = new Date().getMonth();
    const paymentMonth = paymentDate.getMonth();

    if (paymentPeriod === 'all') return matchesSearch;
    if (paymentPeriod === 'current') return matchesSearch && paymentMonth === currentMonth;
    if (paymentPeriod === 'pending') return matchesSearch && payment.status === 'PENDING';
    // Not applicable for M-Pesa but kept for consistency
    if (paymentPeriod === 'overdue') return false;

    return matchesSearch;
  });

  return (
    <Box>
      {/* Title and Add Payment Button */}
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

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

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
              <TableCell>Tenant Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} align="center" style={{ color: 'red' }}>{error}</TableCell>
              </TableRow>
            ) : filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No transactions found</TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment) => (
                <TableRow key={payment.transaction_id}>
                  <TableCell>{payment.company_ref || payment.transaction_id}</TableCell>
                  <TableCell>{payment.customer_name}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(payment.transaction_time).toLocaleDateString()}</TableCell>
                  <TableCell>M-Pesa</TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status === 'COMPLETED' ? 'Completed' : 'Pending'}
                      color={payment.status === 'COMPLETED' ? 'success' : 'info'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      title="View Details"
                      onClick={() => handleGenerateReceipt(payment.transaction_id)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      title="Print Receipt"
                      onClick={() => handleGenerateReceipt(payment.transaction_id)}
                    >
                      <PrintIcon fontSize="small" />
                    </IconButton>
                    {payment.status !== 'COMPLETED' && (
                      <IconButton
                        size="small"
                        title="Confirm Payment"
                        onClick={() => handleConfirmTransaction(payment.transaction_id)}
                        disabled={loading}
                      >
                        <CheckIcon fontSize="small" color="success" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
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

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Payments;
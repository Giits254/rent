import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  // Add the missing imports here
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BackupIcon from '@mui/icons-material/Backup';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// Add the missing icon import
import AddIcon from '@mui/icons-material/Add';

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Company settings state
  const [companySettings, setCompanySettings] = useState({
    companyName: 'ABC Property Management',
    address: '123 Business Ave, Suite 500, Business City, ST 12345',
    phone: '(555) 123-4567',
    email: 'contact@abcpropertymanagement.com',
    website: 'www.abcpropertymanagement.com',
    taxId: 'XX-XXXXXXX'
  });

  // User settings state
  const [userSettings, setUserSettings] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@abcpropertymanagement.com',
    phone: '(555) 987-6543',
    role: 'Administrator'
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    leaseReminders: true,
    maintenanceUpdates: true,
    marketingEmails: false
  });

  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    currency: 'USD',
    timezone: 'America/New_York',
    autoBackup: true,
    dataRetention: '3 years',
    darkMode: false
  });

  // Users with access state
  const [users] = useState([
    { id: 1, name: 'Admin User', email: 'admin@abcpropertymanagement.com', role: 'Administrator', lastLogin: '2025-03-17 09:15 AM' },
    { id: 2, name: 'Jane Smith', email: 'jane@abcpropertymanagement.com', role: 'Property Manager', lastLogin: '2025-03-16 02:30 PM' },
    { id: 3, name: 'Mike Johnson', email: 'mike@abcpropertymanagement.com', role: 'Accountant', lastLogin: '2025-03-15 11:45 AM' }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCompanySettingsChange = (field) => (event) => {
    setCompanySettings({
      ...companySettings,
      [field]: event.target.value
    });
  };

  const handleUserSettingsChange = (field) => (event) => {
    setUserSettings({
      ...userSettings,
      [field]: event.target.value
    });
  };

  const handleNotificationToggle = (setting) => (event) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: event.target.checked
    });
  };

  const handleSystemSettingsChange = (field) => (event) => {
    setSystemSettings({
      ...systemSettings,
      [field]: field === 'autoBackup' || field === 'darkMode'
        ? event.target.checked
        : event.target.value
    });
  };

  const handleSaveSettings = () => {
    // In a real application, this would save to a backend
    setSnackbarMessage('Settings saved successfully');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Settings</Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<BusinessIcon />} iconPosition="start" label="Company" />
          <Tab icon={<PersonIcon />} iconPosition="start" label="Profile" />
          <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notifications" />
          <Tab icon={<SecurityIcon />} iconPosition="start" label="Security & Privacy" />
          <Tab icon={<ReceiptIcon />} iconPosition="start" label="Billing" />
          <Tab icon={<SupervisorAccountIcon />} iconPosition="start" label="Users & Roles" />
          <Tab icon={<BackupIcon />} iconPosition="start" label="Backup & Restore" />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 3 }}>
        {/* Company Settings */}
        {tabValue === 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>Company Details</Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  value={companySettings.companyName}
                  onChange={handleCompanySettingsChange('companyName')}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Address"
                  value={companySettings.address}
                  onChange={handleCompanySettingsChange('address')}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={2}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={companySettings.phone}
                  onChange={handleCompanySettingsChange('phone')}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={companySettings.email}
                  onChange={handleCompanySettingsChange('email')}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Website"
                  value={companySettings.website}
                  onChange={handleCompanySettingsChange('website')}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Tax ID / EIN"
                  value={companySettings.taxId}
                  onChange={handleCompanySettingsChange('taxId')}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveSettings}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* User Profile Settings */}
        {tabValue === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>User Profile</Typography>

            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                >
                  {userSettings.firstName.charAt(0) + userSettings.lastName.charAt(0)}
                </Avatar>
                <Button variant="outlined">Change Photo</Button>
              </Grid>

              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={userSettings.firstName}
                      onChange={handleUserSettingsChange('firstName')}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={userSettings.lastName}
                      onChange={handleUserSettingsChange('lastName')}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      value={userSettings.email}
                      onChange={handleUserSettingsChange('email')}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={userSettings.phone}
                      onChange={handleUserSettingsChange('phone')}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={userSettings.role}
                        onChange={handleUserSettingsChange('role')}
                        label="Role"
                      >
                        <MenuItem value="Administrator">Administrator</MenuItem>
                        <MenuItem value="Property Manager">Property Manager</MenuItem>
                        <MenuItem value="Accountant">Accountant</MenuItem>
                        <MenuItem value="Maintenance Staff">Maintenance Staff</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveSettings}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Notification Settings */}
        {tabValue === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom>Notification Preferences</Typography>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Communication Channels</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationToggle('emailNotifications')}
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                />
                <Box sx={{ pl: 4, mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Receive notifications via email at {userSettings.email}
                  </Typography>
                </Box>

                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onChange={handleNotificationToggle('smsNotifications')}
                      color="primary"
                    />
                  }
                  label="SMS Notifications"
                />
                <Box sx={{ pl: 4, mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Receive notifications via text message at {userSettings.phone}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Notification Types</Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.paymentReminders}
                      onChange={handleNotificationToggle('paymentReminders')}
                      color="primary"
                    />
                  }
                  label="Payment Reminders"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.leaseReminders}
                      onChange={handleNotificationToggle('leaseReminders')}
                      color="primary"
                    />
                  }
                  label="Lease Expiration Reminders"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.maintenanceUpdates}
                      onChange={handleNotificationToggle('maintenanceUpdates')}
                      color="primary"
                    />
                  }
                  label="Maintenance Request Updates"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onChange={handleNotificationToggle('marketingEmails')}
                      color="primary"
                    />
                  }
                  label="Marketing and Newsletter Emails"
                />
              </CardContent>
            </Card>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveSettings}
              >
                Save Preferences
              </Button>
            </Box>
          </Box>
        )}

        {/* Security & Privacy Settings */}
        {tabValue === 3 && (
          <Box>
            <Typography variant="h5" gutterBottom>Security & Privacy</Typography>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Change Password</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Current Password"
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm New Password"
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" color="primary">
                    Update Password
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Two-Factor Authentication</Typography>
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label="Enable Two-Factor Authentication"
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Add an extra layer of security to your account by requiring a verification code in addition to your password.
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Session Management</Typography>
                <Typography variant="body2" gutterBottom>
                  Last login: Today at 9:15 AM from 192.168.1.1
                </Typography>
                <Button variant="outlined" color="error" sx={{ mt: 1 }}>
                  Sign Out of All Devices
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Billing Settings */}
        {tabValue === 4 && (
          <Box>
            <Typography variant="h5" gutterBottom>Billing Settings</Typography>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Current Plan</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">Professional Plan</Typography>
                    <Typography variant="body2" color="text.secondary">
                      $49.99/month, billed annually
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Includes up to 50 properties, unlimited tenants, and premium support.
                    </Typography>
                  </Box>
                  <Button variant="outlined">Change Plan</Button>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Payment Method</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2 }}>
                    <img
                      src="/api/placeholder/45/30"
                      alt="Credit Card"
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1">Visa ending in 1234</Typography>
                    <Typography variant="body2" color="text.secondary">Expires 12/26</Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button variant="outlined" size="small">Update Payment Method</Button>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Billing History</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Invoice</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Mar 01, 2025</TableCell>
                      <TableCell>Subscription - Professional Plan</TableCell>
                      <TableCell>$49.99</TableCell>
                      <TableCell>
                        <Button size="small" startIcon={<CloudDownloadIcon />}>
                          PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Feb 01, 2025</TableCell>
                      <TableCell>Subscription - Professional Plan</TableCell>
                      <TableCell>$49.99</TableCell>
                      <TableCell>
                        <Button size="small" startIcon={<CloudDownloadIcon />}>
                          PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Users & Roles */}
        {tabValue === 5 && (
          <Box>
            <Typography variant="h5" gutterBottom>Users & Roles</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button variant="contained" startIcon={<AddIcon />}>
                Add User
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
                          {user.name}
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">Edit</Button>
                        {user.id !== 1 && (
                          <Button size="small" variant="outlined" color="error" sx={{ ml: 1 }}>
                            Remove
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Roles & Permissions</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Role</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Users</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Administrator</TableCell>
                    <TableCell>Full access to all system features and settings</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">Edit Permissions</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Property Manager</TableCell>
                    <TableCell>Can manage properties, tenants, and maintenance</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">Edit Permissions</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Accountant</TableCell>
                    <TableCell>Access to financial reports and payment records</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">Edit Permissions</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Backup & Restore */}
        {tabValue === 6 && (
          <Box>
            <Typography variant="h5" gutterBottom>Backup & Data Management</Typography>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Automatic Backups</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={systemSettings.autoBackup}
                      onChange={handleSystemSettingsChange('autoBackup')}
                      color="primary"
                    />
                  }
                  label="Enable Automatic Backups"
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                  System will automatically create backups of your data weekly
                </Typography>

                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel>Data Retention Period</InputLabel>
                  <Select
                    value={systemSettings.dataRetention}
                    onChange={handleSystemSettingsChange('dataRetention')}
                    label="Data Retention Period"
                  >
                    <MenuItem value="1 year">1 Year</MenuItem>
                    <MenuItem value="3 years">3 Years</MenuItem>
                    <MenuItem value="5 years">5 Years</MenuItem>
                    <MenuItem value="7 years">7 Years</MenuItem>
                    <MenuItem value="Forever">Forever</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Manual Backup</Typography>
                <Typography variant="body2" gutterBottom>
                  Create a backup of all your system data right now
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<BackupIcon />}
                  sx={{ mt: 1 }}
                >
                  Create Backup
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Previous Backups</Typography>
                <List>
                  <ListItem divider>
                    <ListItemText
                      primary="March 15, 2025 - 09:00 AM"
                      secondary="Automatic backup • 24.6 MB"
                    />
                    <Button startIcon={<CloudDownloadIcon />}>
                      Restore
                    </Button>
                  </ListItem>
                  <ListItem divider>
                    <ListItemText
                      primary="March 8, 2025 - 09:00 AM"
                      secondary="Automatic backup • 24.2 MB"
                    />
                    <Button startIcon={<CloudDownloadIcon />}>
                      Restore
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="March 5, 2025 - 02:15 PM"
                      secondary="Manual backup • 24.1 MB"
                    />
                    <Button startIcon={<CloudDownloadIcon />}>
                      Restore
                    </Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
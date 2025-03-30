import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EventIcon from '@mui/icons-material/Event';

const Dashboard = () => {
  // Placeholder data for dashboard
  const summaryData = [
    { title: 'Total Properties', value: 24, icon: <HomeIcon color="primary" fontSize="large" /> },
    { title: 'Total Tenants', value: 45, icon: <PeopleIcon color="primary" fontSize="large" /> },
    { title: 'Monthly Income', value: '$32,450', icon: <AccountBalanceWalletIcon color="primary" fontSize="large" /> },
    { title: 'Pending Renewals', value: 7, icon: <EventIcon color="primary" fontSize="large" /> },
  ];

  const recentActivities = [
    { id: 1, action: 'Payment Received', description: 'John Doe paid $1,200 for Apartment 3B', date: '2025-03-15' },
    { id: 2, action: 'Lease Signed', description: 'New tenant signed for Property 121 Main St', date: '2025-03-14' },
    { id: 3, action: 'Maintenance Request', description: 'Plumbing issue reported at 456 Oak Ave', date: '2025-03-13' },
    { id: 4, action: 'Property Added', description: 'New property added: 789 Pine St', date: '2025-03-12' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  {item.icon}
                </Box>
                <Typography variant="h5" component="div">
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activities */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <CardHeader title="Recent Activities" />
            <CardContent>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id} divider>
                    <ListItemText
                      primary={activity.action}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {activity.description}
                          </Typography>
                          {` — ${activity.date}`}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Paper>
        </Grid>

        {/* Upcoming Renewals */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <CardHeader title="Upcoming Renewals" />
            <CardContent>
              <List>
                <ListItem divider>
                  <ListItemAvatar>
                    <Avatar>
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Apartment 2A - Sarah Johnson" secondary="Expires: April 15, 2025" />
                </ListItem>
                <ListItem divider>
                  <ListItemAvatar>
                    <Avatar>
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Property 45 Elm St - Michael Brown" secondary="Expires: April 20, 2025" />
                </ListItem>
                <ListItem divider>
                  <ListItemAvatar>
                    <Avatar>
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Unit 12C - David Wilson" secondary="Expires: April 28, 2025" />
                </ListItem>
              </List>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
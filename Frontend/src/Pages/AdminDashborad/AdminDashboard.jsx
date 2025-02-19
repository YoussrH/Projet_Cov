import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import './admindashborad.css';

const AdminDashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [carpools, setCarpools] = useState([]);
  const [activeSection, setActiveSection] = useState('drivers'); // Track the active section

  // Fetch drivers data from the backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/admin/drivers');
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  // Fetch complaints data from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/admin/complaints');
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  // Fetch carpools data from the backend
  useEffect(() => {
    const fetchCarpools = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/admin/carpools');
        const data = await response.json();
        setCarpools(data);
      } catch (error) {
        console.error('Error fetching carpools:', error);
      }
    };

    fetchCarpools();
  }, []);

  // Handle driver validation
  const handleValidateDriver = async (requestId, isApproved) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/approve-driver/${requestId}?isApproved=${isApproved}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setDrivers(drivers.map(driver =>
          driver.id === requestId ? { ...driver, status: isApproved ? 'approved' : 'rejected' } : driver
        ));
      } else {
        console.error('Failed to update driver status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="adminDashboard">
      <h1>Admin Dashboard</h1>
      <div className="sidebar-container">
        <ul className="sidebar-nav">
          <li 
            className={activeSection === 'drivers' ? 'sidebar-item active-item' : 'sidebar-item'} 
            onClick={() => setActiveSection('drivers')}
          >
            Driver Validation
          </li>
          <li 
            className={activeSection === 'complaints' ? 'sidebar-item active-item' : 'sidebar-item'} 
            onClick={() => setActiveSection('complaints')}
          >
            Manage Complaints
          </li>
          <li 
            className={activeSection === 'carpools' ? 'sidebar-item active-item' : 'sidebar-item'} 
            onClick={() => setActiveSection('carpools')}
          >
            Manage Carpools
          </li>
        </ul>
      </div>

      <div className="content-container">
        {activeSection === 'drivers' && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>{driver.driverDetails.name}</TableCell>
                    <TableCell>{driver.driverDetails.email}</TableCell>
                    <TableCell>{driver.status}</TableCell>
                    <TableCell>
                      {driver.status === 'pending' && (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleValidateDriver(driver.id, true)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleValidateDriver(driver.id, false)}
                            style={{ marginLeft: '10px' }}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {activeSection === 'complaints' && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Passenger</TableCell>
                  <TableCell>Complaint</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{complaint.passenger}</TableCell>
                    <TableCell>{complaint.complaint}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {activeSection === 'carpools' && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Driver</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carpools.map((carpool) => (
                  <TableRow key={carpool.id}>
                    <TableCell>{carpool.driver.name}</TableCell>
                    <TableCell>{carpool.destination}</TableCell>
                    <TableCell>{carpool.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
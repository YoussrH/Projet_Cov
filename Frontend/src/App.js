import React from "react";
import Navbar from "./Components/Navbar/NavBar"; // Ensure this path is correct
import Home from "./Pages/Home/Home";
import FindRide from "./Pages/FindRide/FindRide";
import PostRide from "./Pages/PostRide/PostRide";
import RideDetails from "./Pages/RideDetails/RideDetails";
import { Route, Routes } from "react-router-dom";
import { RidesProvider } from "./RidesContext";
import AdminDashboard from "./Pages/AdminDashborad/AdminDashboard";
import DriverDashboard from "./Pages/DriverDashboard/DriverDashboard";
import SignIn from "./Pages/Authentification/SignIn";
import SignUp from "./Pages/Authentification/SignUp";
import BecomeDriver from "./Pages/BecomeDriver/BecomeDriver";
import FileCompline from "./Pages/FileComplain/FileCompline";

function App() {
  return (
    <>
      <Navbar /> 
      <RidesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/get-ride" element={<FindRide />} />
          <Route path="/Post-ride" element={<PostRide />} />
          <Route path="/complain" element={<FileCompline />} />
          <Route path="/ride-details" element={<RideDetails />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          <Route path="/become-driver" element={<BecomeDriver />} />
        </Routes>
      </RidesProvider>
    </>
  );
}

export default App;

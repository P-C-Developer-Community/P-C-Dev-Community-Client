import "./App.css";
import { css } from "@emotion/react";
import { Routes, Route } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";  
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditUserProfilePage from "./pages/EditUserProfilePage";

import ProjectsPage from "./pages/ProjectsPage";
import EditProjectPage from "./pages/EditProjectPage";
import AddProject from "./components/AddProject";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

import ContributionsPage from "./pages/ContributionsPage";
import EditContributionPage from "./pages/EditContributionPage";
import AddContribution from "./components/AddContribution";
import ContributionDetailsPage from "./pages/ContributionDetails.Page";



function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
            <Route exact path="/" element={<HomePage />} />

            <Route path="/projects" element={ <IsPrivate> <ProjectsPage/> </IsPrivate> } />
            <Route path="/projects/:projectId" element={ <IsPrivate> <ProjectDetailsPage /> </IsPrivate> } /> 
            <Route path="/projects/edit/:projectId" element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } />
            <Route path="/projects/addproject" element={ <IsPrivate> <AddProject /> </IsPrivate> } />

            <Route path="/contributions" element={ <IsPrivate> <ContributionsPage/> </IsPrivate> } />
            <Route path="/contributions/:contributionId" element={ <IsPrivate> <ContributionDetailsPage /> </IsPrivate> } /> 
            <Route path="/contributions/edit/:contributionId" element={ <IsPrivate> <EditContributionPage /> </IsPrivate> } />
            <Route path="/contributions/addcontribution" element={ <IsPrivate> <AddContribution /> </IsPrivate> } />

            <Route path="/signup" element={<IsAnon> <SignUpPage /> </IsAnon>} />
            <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

            <Route path="/userprofilepage" element={<IsPrivate> <UserProfilePage /></IsPrivate>} />
            <Route path="/userprofilepage/edit/:userId" element={<IsPrivate> <EditUserProfilePage /></IsPrivate>} />
        </Routes>
    </div>
  );
}

export default App;

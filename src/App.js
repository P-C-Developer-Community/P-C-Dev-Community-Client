import "./App.css";
import Inbox from "./pages/Inbox";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import IsAnon from "./components/IsAnon";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import IsPrivate from "./components/IsPrivate";
import ProjectsPage from "./pages/ProjectsPage";
import AddProject from "./components/AddProject";
import { Routes, Route } from "react-router-dom";
import CommunityPage from "./pages/CommunityPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditProjectPage from "./pages/EditProjectPage";
import ContributionsPage from "./pages/ContributionsPage";
import AddContribution from "./components/AddContribution";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditContributionPage from "./pages/EditContributionPage";
import ContributionDetailsPage from "./pages/ContributionDetails.Page";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route path="/projects" element={<ProjectsPage />} />
        <Route
          path="/projects/:projectId"
          element={
            <IsPrivate>
              {" "}
              <ProjectDetailsPage />{" "}
            </IsPrivate>
          }
        />
        <Route
          path="/projects/edit/:projectId"
          element={
            <IsPrivate>
              {" "}
              <EditProjectPage />{" "}
            </IsPrivate>
          }
        />
        <Route
          path="/projects/addproject"
          element={
            <IsPrivate>
              {" "}
              <AddProject />{" "}
            </IsPrivate>
          }
        />

        <Route path="/contributions" element={<ContributionsPage />} />
        <Route
          path="/contributions/:contributionId"
          element={
            <IsPrivate>
              {" "}
              <ContributionDetailsPage />{" "}
            </IsPrivate>
          }
        />
        <Route
          path="/contributions/edit/:contributionId"
          element={
            <IsPrivate>
              {" "}
              <EditContributionPage />{" "}
            </IsPrivate>
          }
        />
        <Route
          path="/contributions/addcontribution"
          element={
            <IsPrivate>
              {" "}
              <AddContribution />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignUpPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />{" "}
            </IsAnon>
          }
        />

        <Route
          path="/userprofilepage"
          element={
            <IsPrivate>
              {" "}
              <UserProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/inbox"
          element={
            <IsPrivate>
              <Inbox />
            </IsPrivate>
          }
        />

        <Route
          path="/community"
          element={
            <IsPrivate>
              {" "}
              <CommunityPage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

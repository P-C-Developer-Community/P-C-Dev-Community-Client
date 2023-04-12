import "./App.css";
import { Routes, Route } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";  
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import EditProjectPage from "./pages/EditProject";
import AddProject from "./pages/AddProject";



function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/projects" element={ <IsPrivate> <ProjectsPage/> </IsPrivate> } />
            {/* <Route path="/projects/:projectId" element={ <IsPrivate> <ProjectDetailsPage /> </IsPrivate> } /> */}
            <Route path="/projects/edit/:projectId" element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } />
            <Route path="/projects/addproject" element={ <IsPrivate> <AddProject /> </IsPrivate> } />
            <Route path="/signup" element={<IsAnon> <SignUpPage /> </IsAnon>} />
            <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        </Routes>
    </div>
  );
}

export default App;

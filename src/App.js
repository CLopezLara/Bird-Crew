import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./Components/Layout/Header";
import Home from "./Components/Home/Home";
import Privacypolitics from "./Components/Layout/Privacypolitics";
import Footer from "./Components/Layout/Footer";
import Contact from "./Components/Contact/Contact";
import Blog from "./Components/Blog/Blog";
import Login from "./Components/Login/Login";
import axios from "axios";
import CallbackAuth from "./Components/Utils/CallbackAuth";
import ScrollToTop from "./Components/Utils/ScrollToTop";
import CreatePost from "./Components/Blog/CreatePost";
import Post from "./Components/Blog/Post";
import ProtectedRoute from "./Components/Utils/ProtectedRoute";
import EditPost from "./Components/Blog/EditPost";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <div className="Content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="politicas-de-privacidad" element={<Privacypolitics />} />
          <Route path="Contacto" element={<Contact />} />
          <Route
            path="Blog"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route path="Login" element={<Login />} />
          <Route path="auth/callback" element={<CallbackAuth />} />
          <Route
            path="crear-publicacion"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="post/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Post />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-post/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditPost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

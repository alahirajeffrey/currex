import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import axios from "axios";
// import Cookies from "js-cookie";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8172/api/v1/wallet/login",
        formData
      );

      if (response.status === 200) {
        // save token in local storage
        setToken(response.data.data);
        localStorage.setItem("token", token);

        // get verifiable credential and save as a cookie
        const verifiableCredentialResponse = await axios.post(
          "http://localhost:8172/api/v1/wallet/credentials",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (verifiableCredentialResponse.status === 200) {
          localStorage.setItem(
            "verifiableCredential",
            verifiableCredentialResponse.data.data
          );
        } else {
          navigate("/wallet");
        }

        navigate("/dashboard");
      } else {
        alert("Login failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-md mx-auto p-8 mt-10 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>
        <Button title="Login" onPressed={handleSubmit} />
      </div>
    </div>
  );
};

export default Login;

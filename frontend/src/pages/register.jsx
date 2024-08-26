import { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    countryCode: "",
    username: "",
  });

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
        "http://localhost:8172/api/v1/wallet/create",
        formData
      );

      if (response.status === 201) {
        Cookies.set("didUri", response.data.data.didUri, {
          path: "/",
        });
        localStorage.setItem("walletDetails", response.data.data.wallet);
        navigate("/login");
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
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Country Code
          </label>
          <input
            type="text"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>
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
        <div className="flex justify-center items-center ">
          <Button title="Register" onPressed={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Register;

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="w-3/4 p-8 bg-gray-100"></div>
      </div>
    </div>
  );
};

export default Dashboard;

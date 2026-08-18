import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
			<h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
			<p className="text-gray-400">{user?.email}</p>
			<button onClick={handleLogout} className="bg-red-600 hover:bg-red-500 transition text-white rounded px-4 py-2">
				Logout
			</button>
		</div>
	);
}

export default Dashboard;

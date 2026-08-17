import { useAuth } from "../context/AuthContext";

function Dashboard() {
	const { user } = useAuth();

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
			<h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
			<p className="text-gray-400">{user?.email}</p>
		</div>
	);
}

export default Dashboard;

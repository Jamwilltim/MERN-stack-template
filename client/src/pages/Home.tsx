import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
	const { user } = useAuth();

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4 px-4 text-center">
			<h1 className="text-4xl font-bold">Welcome to MyApp</h1>
			<p className="text-gray-400 max-w-md">A short pitch for what this app does goes here.</p>

			{!user && (
				<Link to="/register" className="bg-blue-600 hover:bg-blue-500 transition text-white rounded px-5 py-2.5 mt-2">
					Get Started
				</Link>
			)}
		</div>
	);
}

export default Home;

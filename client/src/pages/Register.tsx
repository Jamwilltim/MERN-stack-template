import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { register } = useAuth();
	const navigate = useNavigate();

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await register(name, email, password);
			navigate("/");
		} catch (err: any) {
			setError(err.response?.data?.message || "Registration failed");
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center">
			<form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-full max-w-sm flex flex-col gap-4">
				<h1 className="text-2xl font-bold text-white">Register</h1>

				{error && <p className="text-red-400 text-sm">{error}</p>}

				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="bg-gray-700 text-white rounded px-3 py-2 outline-none"
					required
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="bg-gray-700 text-white rounded px-3 py-2 outline-none"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="bg-gray-700 text-white rounded px-3 py-2 outline-none"
					required
				/>
				<button type="submit" className="bg-blue-600 hover:bg-blue-500 transition text-white rounded py-2">
					Register
				</button>

				<p className="text-gray-400 text-sm text-center">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-400 hover:underline">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Register;

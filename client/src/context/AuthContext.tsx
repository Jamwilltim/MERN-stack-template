import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../api/axios";

interface User {
	_id: string;
	name: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// On mount, check if a token exists and fetch the current user
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setLoading(false);
			return;
		}

		api.get("/auth/me")
			.then((res) => setUser(res.data))
			.catch(() => localStorage.removeItem("token"))
			.finally(() => setLoading(false));
	}, []);

	const login = async (email: string, password: string) => {
		const res = await api.post("/auth/login", { email, password });
		localStorage.setItem("token", res.data.token);
		setUser(res.data);
	};

	const register = async (name: string, email: string, password: string) => {
		const res = await api.post("/auth/register", { name, email, password });
		localStorage.setItem("token", res.data.token);
		setUser(res.data);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

import {ReactNode, createContext, useEffect, useState, useContext, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {signIn as apiSignIn, signOut as apiSignOut} from "../api/user";
import {FieldValues} from "react-hook-form";

interface User {
	user: object;
	isAuthenticated: boolean;
	signIn: (data: FieldValues) => {},
	signOut: () => {},
	setUser: () => {},
}

export const AuthContext = createContext({
	user: null,
	isAuthenticated: false,
	signIn: async () => {
	},
	signOut: async () => {
	},
	setUser: () => {
	},
});

export function AuthProvider({children}: { children: ReactNode }) {
	const [user, setUser] = useState<object | null>(null);

	const isAuthenticated = !!user;

	const signIn = async (formData: Object, fn = () => null) => {
		try {
			const {data} = await apiSignIn(formData);

			setUser(data);
			localStorage.setItem("token", data.token); // Salva o token no localStorage
			fn()
		} catch (error) {
			console.log(error);
		}
	};

	const signOut = async (token: string, fn = () => null) => {
		try {
			const token = localStorage.getItem("token"); // Obtém o token do localStorage
			if (token) {
				await apiSignOut({ token });
			}
			localStorage.removeItem("token");

			fn();
		} catch (error) {
			console.log(error);
		}
	};

	const getUser = async () => {
		const token = localStorage.getItem("token");

		if (token) {
			// Verifica se existe um token armazenado
			setUser({ token });
		}
    };


	useEffect(() => {
		getUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{user, isAuthenticated, signIn, signOut, setUser}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext<T>(): User {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuthContext must be used within a AuthProvider');
	}
	return context as User;
}

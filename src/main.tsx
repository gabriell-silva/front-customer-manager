import React from "react";
import ReactDOM from "react-dom/client";
import {ChakraProvider} from "@chakra-ui/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// Page-Router
import ErrorPage from "./routes/error-page.tsx";
import Clients from "./routes/clientes/index.tsx";
import Create from "./routes/clientes/criar.tsx";
import Edit from "./routes/clientes/[id]/editar.tsx";
import Login from "./routes/login.tsx";
import App from "./routes/app.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
		errorElement: <ErrorPage/>,
	},
	{
		path: "/clientes",
		element: <Clients/>,
	},
	{
		path: "/clientes/criar",
		element: <Create/>,
	},
	{
		path: "/clientes/:id/editar",
		element: <Edit/>,
	},
	{
		path: "/login",
		element: <Login/>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider>
			<AuthProvider>
				<RouterProvider router={router}/>
			</AuthProvider>
		</ChakraProvider>
	</React.StrictMode>
);

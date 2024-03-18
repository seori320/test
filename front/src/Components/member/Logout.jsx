import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";

function Logout() {

	const { auth, setAuth } = useContext(AuthContext);

	const navigate = useNavigate();
	
	const logout = () => {
		
		localStorage.removeItem("post_access_token");
		localStorage.removeItem("id");

		alert(auth + " Logout successful 🔒");
		setAuth(null);
		
		navigate("/");
	};

	useEffect(() => {
		logout();
	}, []);

}

export default Logout;
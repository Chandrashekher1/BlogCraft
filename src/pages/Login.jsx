import React, {  useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login_API, Register_API } from "../utils/constant";
import { FiUser } from "react-icons/fi";
import AuthContext from "../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const [loading ,setLoading] = useState(false)
  const [loadingGuest ,setLoadingGuest] = useState(false)

  const [image,setImage] = useState(null)
  const navigate = useNavigate();

  const {login} = useContext(AuthContext)
  const handleSignUp = () => setIsSignIn(!isSignIn);

  const handleGuestLogin = async () => {
    setLoadingGuest(true)
    try {
      const response = await fetch(Login_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'guest@gmail.com',
          password: 'Guest@123'
        })
      });
      setLoadingGuest(true)
      const data = await response.json();
      const token = response.headers.get("authorization");
      if (response.ok) {
        login(token,data?.image, data._id)
        navigate('/')

      } else {
        alert('Guest login failed');
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message)
      }
      finally{
        setLoadingGuest(false)
      }
  };
 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  try {
    let response;
    const url = isSignIn ? Register_API : Login_API;

    if (isSignIn) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profile", image);

      response = await fetch(url, {
        method: "POST",
        body: formData,
      });
    } else {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    }

    const data = await response.json();
    const token = response.headers.get("authorization");

    if (token) {
      login(token, data?.image, data._id);
      navigate("/");
    } else {
      throw new Error("No token received from server");
    }
  } catch (error) {
    console.error("Error:", error.message);
    setMessage(error.message);
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-900 rounded-2xl px-8 py-10 w-11/12 sm:w-96 lg:w-[28rem] text-gray-300">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          {isSignIn ? "Sign Up" : "Login"}
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {isSignIn && (
            <>
              <label className="font-semibold text-lg my-2">Name:</label>
              <input
                type="text"
                required
                placeholder="Enter your Name.."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border px-4 py-2 border-gray-700 outline-none rounded-md focus:ring-2 focus:ring-gray-700 transition-all"
              />
            </>
          )}
          <label className="font-semibold text-lg my-2">Email:</label>
          <input
            type="email"
            required
            placeholder="Email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 border-gray-700 outline-none rounded-md focus:ring-2 focus:ring-gray-700 transition-all"
          />
          <label className="font-semibold text-lg my-2">Password:</label>
          <input
            type="password"
            required
            placeholder="Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-2 border-gray-700 outline-none rounded-md focus:ring-2 focus:ring-gray-700 transition-all"
          />
          {isSignIn && <label className="font-semibold text-lg my-2">Profile Image</label>}
          {isSignIn && <input
            type="file"
            required
            accept="image/*"
            placeholder="Upload  your profile image.."
            onChange={(e) => setImage(e.target.files[0])}
            className="border px-4 py-2 border-gray-700 outline-none rounded-md focus:ring-2 focus:ring-gray-700 transition-all"
          />}
          {message && <p className="text-red-500 text-sm mx-2 mt-2">{message}</p>}

          <button
              type="submit"
              className="mt-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                isSignIn ? "Register" : "Proceed"
              )}
            </button>

          
          <p className="mt-6 text-sm text-center">
            {isSignIn ? "Already have an account?" : "Haven't registered yet?"}{" "}
            <button
              className="text-gray-500 font-semibold cursor-pointer underline hover:text-gray-400"
              onClick={handleSignUp}
            >
              {isSignIn ? "Login" : "Register"}
            </button>
          </p>
          
            

        </form>
        <div>
            <button
              className="my-6 cursor-pointer flex font-semibold border border-gray-700 bg-gray-800 rounded-md p-2 items-center justify-center"
              onClick={handleGuestLogin}
              disabled={loadingGuest}
            >
              {loadingGuest ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <>
                  <FiUser className="my-1 mx-2" />
                  Login as Guest
                </>
              )}
            </button>

          </div>
      </div>
    </div>
  );
};

export default Login;

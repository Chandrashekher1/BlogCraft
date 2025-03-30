import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const token = localStorage.getItem("authorization");
    const [data, setData] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authorization");
        navigate("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://cp-blog.onrender.com/api/user/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch user data");

                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-black text-white px-4">
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl px-8 py-10 bg-gray-800 bg-opacity-50 shadow-xl shadow-cyan-800 rounded-2xl backdrop-blur-md text-center">
                <img 
                    src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg" 
                    alt="Profile" 
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover mx-auto border-4 border-cyan-500"
                />
                <h1 className="text-2xl sm:text-3xl font-bold mt-6">Name: <span className="text-cyan-400">{data.name}</span></h1>
                <h2 className="text-lg sm:text-2xl mt-3">Email: <span className="text-gray-300">{data.email}</span></h2>
                
                <button 
                    className="mt-8 w-full bg-red-600 hover:bg-red-700 transition-all duration-300 text-white text-lg sm:text-xl font-semibold px-6 py-3 rounded-lg shadow-lg active:scale-95 cursor-pointer"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
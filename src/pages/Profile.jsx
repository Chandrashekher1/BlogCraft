import React, { useEffect, useState } from 'react'

const Profile = () => {
    const token = localStorage.getItem("authorization")
    const [data,setData] = useState('')
    
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch("https://cp-blog.onrender.com/api/user/me", {
                method:"GET",
                headers: {
                    "Authorization": `${token}`,
                    "Content-type":"appliation/json"
                }
            })
            const json = await response.json()
            console.log(json);

            setData(json)
            
        }
        fetchData()
    } ,[])

  return (
    <div className='h-screen flex felx-col justify-center my-16'>
        <div className='px-32 py-8 shadow-2xl shadow-cyan-800 '>
            <img src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg" alt="profile_image" className='w-40 h-40 rounded-full object-cover mx-32'/>
            <h1 className='flex font-bold text-4xl mt-8'>Name : <p className='mx-4'>{data.name}</p></h1>
            <h2 className='flex font-bold text-4xl mt-4'>email : <p className='mx-4'>{data.email}</p></h2>
            
            <button className='font-semibold border text-3xl bg-red-600 mt-16 mx-32 cursor-pointer py-2 px-8 rounded-md '>Logout</button>
        </div>
    </div>
  )
}

export default Profile
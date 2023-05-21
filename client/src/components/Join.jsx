import { useState } from "react";
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"

const Join = () => {

    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/chat/${user}`)
    }

    return (
        <div
            className="bg-black h-screen w-screen flex justify-center items-center"
        >
            <div className="flex flex-col items-center">
                <img src={logo} alt="" className="w-[10vmax] ml-8" />
                <h1 className="text-white text-[2vmax] font-roboto w-[30vmax] border-b-[0.2vmax] border-solid text-center p2">C-CHAT</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input onChange={(e) => setUser(e.target.value)} value={user} required placeholder="Enter Your Name" type="text" id="joinInput" className="w-[30vmax] p-[1vmax] border-none outline-none text-xl margin-2 rounded-lg mt-5" />
                    <button type="submit" className="w-[30vmax] p-[1vmax] text-xl bg-red-600 rounded-lg mt-5 font-roboto text-white hover:bg-red-800 transition-all duration-300 cursor-pointer">Login In</button>
                </form>
            </div>
        </div>
    )
}

export default Join
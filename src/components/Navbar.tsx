import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <div className="w-full p-8 bg-gray-800 flex justify-between">
        <h1 className="text-4xl font-bold text-white">Beer Gardern</h1>
        <div className="flex gap-6">
            <Link to={"/"} style={{textDecoration: "none", color: "white"}} className="cursor-pointer">
            <h5 className="hover:text-red-500">Home</h5>
            </Link>
            <Link to={"/search"} style={{textDecoration: "none", color: "white"}} className="cursor-pointer">
            <h5 className="hover:text-red-500">Search</h5>
            </Link>
        </div>
    </div>
  )
}

export default Navbar
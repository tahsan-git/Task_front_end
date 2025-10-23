import { useState } from "react";
import { Link, useNavigate } from "react-router";
const LogInForm = () => {
  const navigate = useNavigate()
  const [isLogIn, setIsLogIn] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    const {email} = e.target
    const val = email.value

    try{
      const response = await fetch(`http://localhost:5000/userEmail?email=${val}`).then((res) => res.json()).then(() => setIsLogIn(true)).catch((error) => console.error(error))
    }
    catch(error){
      console.error(error)
    }
  }

  if(isLogIn){
    navigate("/task")
  }
  else{

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <form onSubmit={submit} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Login to Your Account
          </h2>
  
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-600 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            SUBMIT
          </button>
  
          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    );
  }
};
export default LogInForm;

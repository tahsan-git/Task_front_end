import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [food, setFood] = useState([]);
  const [backend, setBackend] = useState([]);
  const navigate = useNavigate()


  const handle = async (e) => {
    e.preventDefault();
    const { name, email, password } = e.target;

    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    console.log(data);
    try {
      const response = await fetch("https://task-backend-l5oz.onrender.com/f", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Hoy nai");
      }

      const result = await response.json();
      navigate("/task")
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetch("https://task-backend-l5oz.onrender.com/form")
      .then((res) => res.json())
      .then((data) => setBackend(data))
      .catch((error) => console.error(error));
  });

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <form
          onSubmit={handle}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Create an Account
          </h2>

          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1 font-medium">
              Email
            </label>
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
            Register
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to={"/"} className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div>
        <footer className="bg-orange-700 flex flex-col justify-center items-center">
          {backend.map((item) => {
            return (
              <>
                <h1>{item.name} </h1>
                <h1>{item.email}</h1>
              </>
            );
          })}
        </footer>
      </div>
    </>
  );
};

export default Form;

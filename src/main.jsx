import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router"
import LogInForm from './LogInForm.jsx'
import Home from './Home.jsx'
import Form from './Form.jsx'

const router = createBrowserRouter([{path: "/", element: <LogInForm></LogInForm> },{path: "/task", element: <Home></Home>},{path:"/signup",element:<Form></Form>}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

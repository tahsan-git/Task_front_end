import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './Form'
import Home from './Home'
import LogInForm from './LogInForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      {/* <Form></Form> */}
      {/* <Home></Home> */}
      <LogInForm></LogInForm>

    </>
  )
}

export default App

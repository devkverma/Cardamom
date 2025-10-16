import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import AuthProvider from './AuthProvider'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

function App() {


  return (
    <>
      
      <AuthProvider>
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/register' element = {<PublicRoute><Register/></PublicRoute>}/>
              <Route path='/login' element = {<PublicRoute><Login/></PublicRoute>} />
              <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App

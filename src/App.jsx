import React from 'react'
import Navi from './components/Navigation/navigate'
import { Route, Routes } from 'react-router-dom'
import About from './page/About/About'
import { Contact } from './page/Contact/Contact'
import { Register } from './page/Register/Register'
import { Login } from './page/login/Login'
import { Home } from './page/Home/Home'
import { Bookingcar } from './page/Bookingcar/Bookingcar'
import { Bookingbike } from './page/Bookingbike/Bookingbike'
import { Bikebook } from './page/Bookingbike/bikebooking'
import { Carbookbutton } from './page/Bookingcar/carbooking'


const App = () => {
  return (
    <div className='app'>
       <Navi/>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/bookcar' element= {<Bookingcar/>}/>
        <Route path='/bookbike' element= {<Bookingbike/>}/>
        <Route path='/about' element= {<About/>}/>
        <Route path='/contact' element= {<Contact/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/bikebooking' element={<Bikebook/>}/>
        <Route path='/carbooking' element={<Carbookbutton/>}/>
      </Routes>
     
    </div>
  )
}

export default App
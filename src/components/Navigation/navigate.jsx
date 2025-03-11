import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import './navigate.css';

function Navi() {
  const [menu, setMenu] = useState("home");
  const[user,setUser] = useState(null);

  useEffect(()=>{
    const storeduser = JSON.parse(localStorage.getItem("user"));
    if(storeduser){
      setUser(storeduser);
    }
  },[]);
  
  const handlelogout= () =>{
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  }

  return (
    <>
      <div className='navbar'>
        <div className="logo-container">
 <Link to="/"> <img src="assets\th-removebg-preview.png" alt="Star Rentals Logo" className="logo" /> </Link>
          <span className="brand-name">Star Rentals</span>
        </div>

        <ul className="navtabs">
          <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setMenu("bookcar")} className={menu === "bookcar" ? "active" : ""}>
            <Link to="/bookcar">Book Car</Link>
          </li>
          <li onClick={() => setMenu("bookbike")} className={menu === "bookbike" ? "active" : ""}>
            <Link to="/bookbike">Book Bike</Link>
          </li>
          <li onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>
            <Link to="/about">About</Link>
          </li>
          <li onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="navsign">
      {user ? (
        <div className="user-profile">
                <CgProfile size={30} className='user-icon'/>
                <div className="user-drop">
                  <p>Welcome, <br></br><b>{user.uname}</b></p>
                  <button onClick={handlelogout}>Logout</button>
                </div>
        </div>
      ):
      (
        <>
        <button><Link to ='/login'>login</Link></button>
        <button><Link to ='/register'> register </Link></button></>
      )

      }
    </div>
      </div>
    </>
  );
}

export default Navi;

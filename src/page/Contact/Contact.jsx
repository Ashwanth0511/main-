import React, { useEffect, useState } from "react";
import './Contact.css'
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocalPhone } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaShop } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import axios from "axios";


export function Contact(){
  const handleLocationget= ()=>{
    const googleMapsUrl ="https://www.google.com/maps/place/Karpagam+College+of+Engineering/@10.8770786,77.0228199,14.25z/data=!4m6!3m5!1s0x3ba84ffc9b3ea755:0xda7508a90583d22f!8m2!3d10.8801009!4d77.0223684!16s%2Fm%2F03m6r9n?entry=ttu";
      window.open(googleMapsUrl, "_blank")
  }
  const [rname,setRname] = useState("");
  const [email,setEmail] = useState("");
  const [complain,setComplain] = useState("");

  const handlecomplains = (e)=>{
    e.preventDefault();
    alert("Sorry for our inconvinient We can solve your complain as soon as possible");
    axios.post('http://localhost:3001/Complains',{rname,email,complain})
    .then(result=>console.log(result.data))
    .catch(err=>console.log(err));
  }

  const [user,setUser] = useState(null);
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if(storedUser){
      setUser(storedUser);
      setRname(storedUser.uname||"")
      setEmail(storedUser.email||"")
    }
  },[]);



  return (
    <>
    <div className="pagecontainer">
      
    <section className="seccontainer">
    <h1>Contact Information</h1>
    <hr />
    <div className="features">
        <div className="feature">
        <FaLocationDot className="cont-icons" onClick={()=>handleLocationget()}/>
        <p>123 Street, coimbatore , Tamilnadu</p>
        </div>
        <div className="feature">
        <MdLocalPhone className="cont-icons"/>
        <p> +91 8838415364</p>
        </div>
        <div className="feature">
        <IoMail className="cont-icons"/>
        <p> starrentals@gmail.com</p>
        </div>
        
        <div className="feature">
        <FaShop className="cont-icons"/>
        <p> Mon-Fri, 9 AM - 6 PM</p>
        <p> Sat&Sun, 6 AM - 12 PM</p>
        </div>
      </div>
      <br></br>
      <hr />
      </section> 
    </div>
  
    <div className="detcontainer">
   <div className="comments">
    
    <h2>Also Contact Us Through</h2>
    <p>We can take action in 2 or 3 Working days</p>
    <div className="formouter">
    <form onSubmit={()=>handlecomplains()}>
      <label >Name :</label>
      <input type = "text" value={rname} onChange={(e)=>{setRname(e.target.value)}}  required></input>
      <label>Email :</label>
      <input type = "email" value={email} onChange={(e)=>setEmail(e.target.value ) } required></input>
      <label>Complains :</label>
      <textarea name="complains" value={complain} rows={6} cols={31} minLength={20} onChange={(e)=>setComplain(e.target.value)} id="" placeholder="Write a complains" required></textarea>
      <button type="submit"><IoIosSend /></button>
    </form>
    </div>   </div>
    </div>
    <hr />


    <footer className="footcont">
     <div className="footcol">
      <h4>Follow us on our Social Media</h4>
      <table>
        <thead>
        <tr>
          <td><a href="#"><img src="assets/facebook.png" alt="" width='30px' height="30px" /></a></td>
          <td><a href="https://www.instagram.com/ash_0511_?igsh=eWh1MHlhcmt1dXgz"><img src="assets\instagram-26.png" alt="insta" width="26px" height="26px" /></a></td>
        </tr></thead>
      </table>
     </div>
     <div className="footcol">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to='/about'>About us</Link></li>
            <li><Link to='/contact'>Contact us</Link></li>
            <li><Link to='/bookbike'>Book Bike</Link></li>
            <li><Link to='/bookcar'>Book Car</Link></li>
            <li><Link to='/'>Home</Link></li>
          </ul>
        </div>
        <div className="footcol">
          <h4>About the Shop</h4>
          <p>
            Welcome to <strong>Star Rental Shop</strong>, your ultimate destination
            for all Bike and Cars! We are passionate transport lovers dedicated to
            connecting riders with a diverse selection of vehicle.
          </p>
        </div>
    </footer>
   
    </>
  )
  }
import React, { useState } from "react";
import "./carbooking.css";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";



export function Carbookbutton() {
  const location = useLocation();
  const[load,setLoad] = useState(true);
  
   const[user,setUser] = useState(null);
   const navigate = useNavigate();
   const [detail,setDetail] = useState(0);

   const [bookingdata,setBookingdata] = useState(()=>{
    return JSON.parse(localStorage.getItem("bookingdata")) || location.state || {};
   })

   useEffect(()=>{
    if(location.state){
      setBookingdata(location.state);
      localStorage.setItem("bookingdata",JSON.stringify(location.state));
    }
   },[location.state]);

  useEffect(()=>{
    const storeduser = JSON.parse(localStorage.getItem("user"));
    if(storeduser){
      setUser(storeduser);
    }
    setLoad(false);
  },[]);

  useEffect(() => {
    if (!load && !user) {
      alert("Login to continue");
      navigate("/login",{state:{from:location.pathname}});
    }
    
  }, [load,navigate,user,location.pathname]);

  if (load && !user) {
    return null;
  }
  const { selectedcar, needn, stilln } = bookingdata || {};
  return (
    <>
   
    <div className="Bookbutton-container">
     
        <div className="booking-form">
          <h2>CONTACT & PICKUP DETAILS</h2>

          <label>Name:</label>
          <input type="text" defaultValue={user?.uname||""}  />

          <label>Email:</label>
          <input type="email" defaultValue={user?.email||""}  />

          <label>Mobile:</label>
          <input type="text" placeholder="Phonenumber" />

          <label>Pickup:</label>
          <input type="text" placeholder="Enter your pickup address" />

          <button
            className="proceed-button"
            onClick={() =>{ 
              alert("Proceeding to Payment")
            localStorage.removeItem("bookingdata");
          }}
          >
            PROCEED
          </button>
          </div>
          <div className="booking-details">
            <h3>YOUR BOOKING CAR DETAILS</h3>
            <p>
              <b>Pickup Date:</b> {new Date(needn).toDateString()}
            </p>
            <p>
              <b>Return Date:</b> {new Date(stilln).toDateString()}
            </p>
            <p>
              <b>Car Type:</b> {selectedcar.name}
            </p>
            <p>
              <b>Total Fare:</b> ${selectedcar.price}
            </p>
            <hr />
            <div className="det_nav">
              <div>
                <p onClick={()=> setDetail(0) }className="det-head">Inclusion</p>
                </div>
              <div>
                <p onClick={()=> setDetail(1) }className="det-head">Exclusion</p>
                </div>
              <div>
                <p onClick={()=> setDetail(2) }className="det-head">Terms & Conditions</p>
                </div>
            </div>
            <div className="Detail-container">
             {(detail === 0)&&(
                <div className="inclusion">
                <h4>Inclusion</h4>
                <ul>
                  <li>Petrol or Disel </li>
                  <li>Drive your own</li>
                </ul>
              </div>) }
            {(detail === 1) &&(
              <div className="exclusion">
              <h4>Exclusion</h4>
              <ul>
                <li>Parking</li>
                <li>Toll fee</li>
              </ul>
            </div>)
             }
                {
              (detail === 2) &&(
                <div className="terms-container">
  <h3>Terms and Conditions</h3>
  <p>You must need a proper driving license to rent a vehicle</p>
  <p>If once payment can be made booking is confoirmed.</p>
  <p>If you want to cancel a booking 1 Day before Only 50% amount only refund</p>
  <p>If the car or bike can be damaged you need to pay for repairs.</p>
  <p>If any fine can be added for Bike can must be paid by you</p>
</div>
              )
             }
            </div>
          </div>
        
    </div>
    
    </>
  );
}
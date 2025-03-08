import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function Register(){
    const navigate = useNavigate();
         const[uname, setUname] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
         const [showpass, setShowpass] = useState(false);
      const  handleregister = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/Authentification',{uname,email,password})
        .then(result=>{console.log(result)
            if(result.data == "Mail already Exist"){
                alert("Mail already Exist");
            }
            else
           navigate('/login');
        }
    )
        .catch(err=>console.log(err));
      } 
          return(
              <div className="page">
              <div className="container">
                  <h1>Register</h1>
                  <br></br>
                  <form onSubmit={handleregister}>
                      <h2>Name</h2>
                      <input type="text" placeholder="Name" value={uname} onChange={(e)=>setUname(e.target.value)} required></input>
                      <h2>Email</h2>
                      <input type="email" placeholder="E-mail" value={email}  onChange={(e) => setEmail(e.target.value)} required autoComplete="email"></input>
                      <h2>Password</h2>
                         <div className="pass-cont">
                                  <input
                                    type={showpass ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                  />
                                  <span className="eye-icon" onClick={() => setShowpass(!showpass)}>
                                    {showpass ? <FaEyeSlash /> : <FaEye />}
                                  </span>
                                </div>
                      
                      <button type="submit">Register</button>
                  </form>
                  <p>or</p>
                  <p>Already have an account  <Link to ='/login' className="clink">login</Link></p>
              </div></div>
          )
}
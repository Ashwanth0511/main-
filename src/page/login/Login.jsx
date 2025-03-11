import React from "react";
import { useState } from "react";
import './Login.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

export function Login(){
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpass, setShowpass] = useState(false);

  const frompage = location.state?.from||"/";
   const handlelogin=(e) => {
             e.preventDefault();
             axios.post('http://localhost:3001/login',{email,password})
             .then(result=>{console.log(result.data);

                if(result.data.status == "Success"){
                    Swal.fire({
                        icon: "success",
                        title: "Login Successful!",
                        text: "Welcome back!",
                        confirmButtonColor: "#3085d6",
                    }).then(()=>{
                        localStorage.setItem("user",JSON.stringify({email,uname:result.data.uname,_id:result.data._id}))
                        navigate(frompage);
                    window.location.reload();
                    })
                    
            }

            else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: result.data,
                    confirmButtonColor: "#d33",
                });
            }})
             .catch(err => console.log(err));
   }

    return(
        <div className="page">
        <div className="container">
            <h1>Login</h1>
            <br></br>
            <form >
                <h2>Email</h2>
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"></input>
                <h2>Password</h2>
                <div className="pass-cont">
            <input type={showpass ? "text" : "password"}  minLength={8}  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
            autoComplete="new-password" />
            <span className="eye-icon" onClick={() => setShowpass(!showpass)}>
              {showpass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
                <button type="submit" onClick={handlelogin}>Login</button>
            </form>
            <p>or</p>
            <p>Don't have an account  <Link to ='/register' className="clink">register</Link></p>
        </div></div>
    )
}
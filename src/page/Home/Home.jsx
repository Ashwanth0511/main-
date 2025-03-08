import React, { useEffect, useState } from "react";
import './Home.css'
import { Link } from "react-router-dom";
import { BsFillSendFill } from "react-icons/bs";
import reviewers from "./reviewers";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import owners from "./owners";
import axios from "axios";
import Background from "../../components/Backgroung/Background";
import Hero from "../../components/Hero/Hero";

export function Home(){

  const [currentindex,setCurrentindex] = useState(0);
  const reviewpage = 3;

  const nextreview = ()=>{
    if(currentindex + reviewpage < reviewers.length){
      setCurrentindex(currentindex+1);
    }
  };

  const prevreview = ()=>{
    if(currentindex - 1 >= 0){
      setCurrentindex(currentindex-1);
    }
  };

  const [id,setId]= useState(false);
  let heroData = [
    {text1:"Rent a car",text2:"What you love"},
    {text1:"Rent a bike",text2:"Drive with passion"},
  ]
const [heroCount,setHeroCount] = useState(0);

useEffect(() => {
  let intervalId;
  const intervalTime = id ? 7000 : 3000;  
  intervalId = setInterval(() => {
    setHeroCount((count) => (count === 1 ? 0 : count + 1));
    if (id) {
      setId(false);
    }}, intervalTime);
  
  return () =>{ clearInterval(intervalId);
    }
}, [id]);

const [user,setUser] = useState(null);

const [comment,setComment] = useState("");

const handlecomments = (e)=>{
  e.preventDefault();

    if(!user){
      alert("login to comment");
      return ;
    }else{
      
      axios.post('http://localhost:3001/comments',{
       name: user.uname,
       comment: comment
      })
      .then(result=>{console.log(result);
       setComment("");
       com();
      })
      .catch(err=>console.log(err));
    }
  }

  const [commentlist,setCommentlist] = useState([]);
  

  const com = async()=>{
    try{
      const res = await axios.get('http://localhost:3001/comments');
      setCommentlist(res.data);
    }
    catch{
      err=>console.log(err);
    }
  }
  useEffect(()=>{
    const storeduser = JSON.parse(localStorage.getItem("user"));
    if(storeduser){
      setUser(storeduser);
    }
    com();
  },[]);
  

  return (
    <>
    <div >
    <div className="home-bg">
      <Background heroCount={heroCount}/>
      <Hero heroData = {heroData[heroCount]}
           heroCount= {heroCount}
           setHeroCount={setHeroCount}
           setId={setId}
           />
        
    </div>
  </div>
    <div className="home-content">
      <div className="moving-slide">
    <p className="container-marque">
      Best website to rent cars and bikes at the lowest prices with top-quality, well-maintained vehicles.
    </p></div>
      <h2>Why Choose Us?</h2>
      <div className="features">
        <div className="feature">
          <h3> Wide Selection</h3>
          <p>Choose from a variety of cars and bikes to suit your needs.</p>
        </div>
        <div className="feature">
          <h3> Affordable Pricing</h3>
          <p>Get the best rates with no hidden charges.</p>
        </div>
        <div className="feature">
          <h3> Easy Booking</h3>
          <p>Quick and hassle-free online booking experience.</p>
        </div>
        <div className="feature">
          <h3> Well-Maintained Vehicles</h3>
          <p>Our cars and bikes are regularly serviced for your safety.</p>
        </div>
      </div>
      <br></br>
      <hr />
    </div>
    <div className="faq">
  <h2>Frequently Asked Questions</h2>
  <details>
    <summary>How do I rent a vehicle?</summary>
    <p>select the dates, Simply choose a car or bike available on selected date, and complete the payment & booking.</p>
  </details>
  <details>
    <summary>What are the rental requirements?</summary>
    <p>You need a valid driver's license and a refundable deposit.</p>
  </details>
  <details>
    <summary>Is there a "Kilometres limit" to how much I can drive?</summary>
    <p>No, There is no KM limit to drive. But you need to bought a fuel on your own ,If the given disel or petrol is finished you need to fill it.</p>
  </details>
  <details>
    <summary>Do I have to bring the car back to the same location?</summary>
    <p>Yes, You need to delivery it in same location.</p>
  </details>
  <hr />
</div>

<div className="think-cont">
   <div className="think">
    <h1>What people Think about us?</h1>
   </div>
   <div className="reviews">
   <FaArrowAltCircleLeft size={70} onClick={()=>prevreview()}/>
    { reviewers.slice(currentindex,currentindex+reviewpage).map((review) =>(
         <div key={review.id} className="rev-bor">
      <div className="rev-img">
        <img src={review.img} alt={review.name}></img>
      </div>
      <div className="rev-det">
       <h2>{review.name}</h2>
       <p>{review.des}</p>
      </div>
      </div>
    ))}
    <FaArrowAltCircleRight size={70} onClick={()=>nextreview()}/>
   </div>
   <hr />
</div>

<div className="faq-comment">
  <h2>Write a comment</h2>
 <form onSubmit={(e)=>handlecomments(e)}>
  <textarea rows={4} cols={50} placeholder="Write a comment" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
  <button type="submit" ><BsFillSendFill /></button>
 </form>

 <div className="Commentdet">
  <div className="Comments">
   {Array.isArray(commentlist) && commentlist.length > 0?(commentlist.map((comment)=>(
      <div className="comment">
        <p>{comment.name}</p>
        <p>{comment.comment}</p>
      </div>
    ))):(
      <p>No comments yet. Be the first to comment!</p>
    )}
  </div>
 </div>
  <hr />
</div>

<div className="ownership">
<h1>Ownerships</h1>
  <div className="own-cont">
 
  <div className="owners">
    {
      owners.map((owner)=>(
        <div key={owner.id} className="owner">
        <div className="img">
          <img src={owner.img}></img>
        </div>
      <h2>{owner.name}</h2>
      <p>{owner.detail}</p>
      <p>{owner.pos}</p>

        </div>
      ))
    }
  </div></div>
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
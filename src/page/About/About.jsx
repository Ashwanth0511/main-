import React from 'react'
import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <div>
      <section className="about-section">
        <h1>About Us</h1>
        <hr />
        <p>
          Welcome to <strong>Star Rental Shop</strong>, your trusted partner for bike and car rentals. We are dedicated to providing reliable, affordable, and high-quality vehicles to make your 
       journey smooth and unforgettable. Whether you're commuting or exploring, we've got the perfect ride for you!
        </p>
        <p>
          At <strong>Star Rental Shop</strong>, we prioritize customer satisfaction and safety.Our vehicles are meticulously maintained and available at competitive prices. 
       Experience hassle-free bookings and exceptional customer service today.
        </p>

        <img src="assets\aboutus.jpg" alt="Customer Support" className="about-image" />
      </section>
<hr />
      <section className="vision-mission">
      <h2>Vision and Mission</h2>
      <div className="section-container">
        <div className="icon">
          <img width="70px" height="70px" src='assets\vision (2).png'/>
        </div>
        <div className="content">
          <ul>
            <li>To be the most preferred and efficient car rental company in the region</li>
           <li>To be the largest aggregator of EV 2Wheeler OEMs in India</li>
            <li>To increase the range of vehicles and branch points to offer more comfortable journeys to customers</li>
          </ul>
        </div>
      </div>

      <div className="section-container">
        <div className="icon">
          <img width="70px" height="70px" src='assets\mi.png'/>
        </div>
        <div className="content">
        <ul>
        <li>To provide the highest level of customer satisfaction</li>
          <li>To create value for all stakeholders</li>
            <li>To offer fast, reassuring, enjoyable, technology-based, and easily accessible car rental services</li>
           <li>To expand the fleet to accommodate more diverse needs</li>
             <li>To establish partnerships with local businesses to offer exclusive customer discounts</li>
          </ul>
        </div>
      </div>
    </section>

       <footer className="footcont">
           <div className="footcol">
            <h4>Follow us on our Social Media</h4>
            <table>
            <thead><tr>
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
                  Welcome to <strong>Star Rental Shop</strong>, your ultimate destination for all Bike and Cars! We are passionate transport lovers dedicated to
 connecting riders with a diverse selection of vehicle.
                </p>
              </div>
          </footer>
         
    </div>
  )
}

import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = ( {heroData ,heroCount,setHeroCount}) => {

  const navigatepath = (heroCount === 0) ? './bookcar' : './bookbike'; 
  return (
    <div className='hero'>
      <div className="herotest">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>
      <div className="explore">
        
        <p>Click here to visit!</p>
        
       
     <Link to={navigatepath}>  <img src="assets\arrow_btn.png" alt="" /></Link> 
      </div>
 <div className="dots">
    <ul className="herodots">
    <li onClick={()=>setHeroCount(0)} className={heroCount===0?"herodot orange":"herodot"}></li>
    <li onClick={()=>setHeroCount(1)} className={heroCount===1?"herodot orange":"herodot"}></li>
    </ul>
 </div>
    </div>
  )
}

export default Hero
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import './displaybike.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Displaybike({need,still}){
  const needn = new Date(need);
  const stilln = new Date(still);
  const rentalDays = Math.ceil((stilln.getTime() - needn.getTime()) / (1000 * 60 * 60 * 24));
  const [bikelist,setBikelist] = useState([])
  const [bikes,setBikes] = useState([]);
  const [searchTerm,setSearchTerm] = useState("")
  const [dropdownopen, setDropdownopen] = useState(false);
  const [selectedcompany,setSelectcompany] = useState("");

  useEffect(()=>{
    axios.get('http://localhost:3001/bikes')
    .then(res=>{
      setBikelist(res.data)
      setBikes(res.data)
    })
    .catch(err=>console.log(err))
  },[])
  
  const companyNames = [...new Set(bikelist.map((bike) => bike.type)),"All"];

  const filteredCompanies = companyNames.filter((company) =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const handlebook = (bikeId) => {
          const selectedBike = bikes.find((bike) => bike._id === bikeId);
    if (selectedBike) {
      selectedBike.price = selectedBike.price * rentalDays
      navigate('/bikebooking', { state: { selectedbike: selectedBike,needn,stilln } });
    }
  };
  
 const availableBike = bikes.map((bike) =>{
    const bookfrom =new Date(bike.bookedOn); 
    const bookedUntil = new Date(bike.availableOn); 
    const isavail =  stilln < bookfrom || needn > bookedUntil;
    return {
      ...bike,
      BookStatus : isavail
    };
});

const filterbikes = selectedcompany && selectedcompany != "All"
? availableBike.filter((bike) => bike.type === selectedcompany)
    : availableBike;

  return(  
<>
    <div className="dropdown">
    <button onClick={()=>setDropdownopen(!dropdownopen)} className="drop-btn">
         {selectedcompany ? selectedcompany : "Search based on company"}{dropdownopen?<FaChevronDown className="drop-dec"/>:<FaChevronUp className="drop-dec"/>}
         </button>
    {dropdownopen && (
      <div className="drop-content">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="search-inp" />
         
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <div
            key={index}
            className="dropdown-item"
            onClick={() => {
              setSelectcompany(company);
              setDropdownopen(false);
            }}
          >
            {company}
          </div>
            
          ))
        ) : (
          <p className="no-result">No company found</p>
        )}
      </div>
    )}

      </div>
    
  <div className="bikedetail">
      <> 
      {
              filterbikes.length>0?(
                filterbikes.map((bike)=>(
                  <div className="Bikeflex" key={bike._id} >
                  <div className="bikeimage"><img src={bike.image} alt="" /></div>
                  <h5>{bike.name}</h5>
                      <p>₹{bike.price} per day</p>
                     {bike.BookStatus?
                     <button onClick={() =>{handlebook(bike._id)}} className="Book">Book</button>:<p style={{color:"green"}}>Available On "{ new Date(bike.availableOn).toLocaleDateString()}"!</p>}
                    
                    </div>
                )
                )
              ):(
                <p className="no-res">No bikes available</p>
              )
             }
   {/* {availableBike.map((bike) =>(
    
        <div className="Carflex" key={bike._id} >
     <div className="carimage"><img src={bike.image} alt="" /></div>
     <h5>{bike.name}</h5>
         <p>${bike.price} per day</p>
        {bike.BookStatus?<button onClick={() =>{handlebook(bike._id)}
                                                                 }
                 className="Book">Book</button>:<p className="booked">Available On "{ new Date(bike.availableOn).toLocaleDateString()}"!</p>}
       
       </div>
    ))
    }*/}</>
  </div></>)
} 
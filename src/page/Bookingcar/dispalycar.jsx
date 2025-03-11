import React, { useEffect, useState } from 'react'
import './display.css'
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Displaycar({need,still}) {
    const needn = new Date(need);
  const stilln = new Date(still);
  const [carlist,setCarlist] = useState([])
  const [cars,setCars] = useState([]);
  const [searchTerm,setSearchTerm] = useState("")
  const [dropdownopen, setDropdownopen] = useState(false);
  const [selectedcompany,setSelectcompany] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3001/cars')
    .then(res=>{
      setCarlist(res.data)
      setCars(res.data)
    })
    .catch(err=>console.log(err))
  },[])
  
  const companyNames = [...new Set(carlist.map((car) => car.type)),"All"];

  const filteredCompanies = companyNames.filter((company) =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlebook = (carId) => {
    const selectedCar = cars.find((car) => car._id === carId);
    if (selectedCar) {
      navigate('/carbooking', { state: { selectedcar: selectedCar,needn,stilln } });
    }
  };
  
 const availablecar = cars.map((car) =>{
    const bookfrom =new Date(car.bookedOn); 
    const bookedUntil = new Date(car.availableOn); 
    const isavail =  stilln < bookfrom || needn > bookedUntil;
    return {
      ...car,
      BookStatus : isavail
    };
});

const filtercars = selectedcompany
? availablecar.filter((car) => car.type === selectedcompany)
    : availablecar;

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
  <div className="cardetail">
      <>
      
        
      {
              filtercars.length>0?(
                filtercars.map((car)=>(
                  <div className="Carflex" key={car._id} >
                  <div className="carimage"><img src={car.image} alt="" /></div>
                  <h5>{car.name}</h5>
                      <p>₹{car.price} per day</p>
                     {car.BookStatus?<button onClick={() =>{handlebook(car._id)}
                                                                              }
                              className="Book">Book</button>:<p className="booked">Available On "{ new Date(car.availableOn).toLocaleDateString()}"!</p>}
                    
                    </div>
                )
                )
              ):(
                <p className="no-res">No cars available</p>
              )
             }
  </>
  </div></>)
}

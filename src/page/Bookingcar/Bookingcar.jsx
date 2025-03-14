import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Bookingcar.css";
import Displaycar  from "./dispalycar";
import Swal from "sweetalert2";

export function Bookingcar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [show, setShow] = useState(false);
    const today = new Date();
    const maxdate = new Date();
    maxdate.setDate(today.getDate() + 10); 

    return (
        <>
            {!show && (
                <video autoPlay muted loop id="myVideo"> <source src="assets\bikeani.mp4" type="video/mp4" /></video>
            )}
            <div className="car-container">
                <div className="bg">
               <h1>Book your car</h1>
                  <label>Select Booking Date</label>
                 <div className="date-picker-container">
           <span>From :</span>
               <DatePicker
                     selected={selectedDate}
                          onChange={(date) => {
                         setSelectedDate(date); setSelectedReturn(null);}}
                        dateFormat={"dd / MM / yyyy"}
                            minDate={today}
                           maxDate={maxdate}
                            placeholderText="Select a date"
                             className="date-box"
                             />
                        <span>To :</span>
                 <DatePicker
                     selected={selectedReturn}
                         onChange={(date) => setSelectedReturn(date)}
                       dateFormat={"dd / MM / yyyy"}
                             minDate={selectedDate}
                           maxDate={selectedDate ? new Date(new Date(selectedDate).setDate(selectedDate.getDate() + 4)) : maxdate}
                             placeholderText="Select a date"
                             className="date-box" />
                        <button onClick={() => selectedDate && selectedReturn ? setShow(true) :  Swal.fire({
                                                icon: "warning",
                                                title: "Date Not Selected!",
                                                text: "Select a date first.",
                                                confirmButtonColor: "#f39c12",
                                            })}>Show Available Cars </button>
                    </div>
                    {show && <Displaycar need={selectedDate} still={selectedReturn}/>}
             </div>
        </div>
      </>
    );
}

import React, { useState } from "react";
import axios from "axios";
import { Button } from "bootstrap";
import { Modal } from "bootstrap";


const baseURL = "https://nameless-shelf-91357.herokuapp.com";


function MySneakers() {
    
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
    const[sneakers, setSneakers] = useState([]);

    React.useEffect(() => {
        getMySneakers()
      }, []);

    function getMySneakers(){
        axios.get(baseURL + "/sneakers").then((response) => {
            setSneakers(response.data);
        });
    }

    return (
        <><ul className="sneakers">
            {sneakers.map(sneaker => <li key={sneaker.id}>{sneaker.sneaker_name}</li>
            )}
        </ul>

        
        </>
    )
}

export default MySneakers
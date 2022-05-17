import React, { useState } from "react";
import axios from "axios";

const baseURL = "https://nameless-shelf-91357.herokuapp.com";

function MySneakers() {
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
        //the <ul> element is just for testing purposes
        //todo Plamen: remove the ul element and implement nicer design
        <ul>
        {sneakers.map(sneaker =>
        <li key={sneaker.id}>{sneaker.sneaker_name}</li>
        )}
        </ul>
    )
}

export default MySneakers
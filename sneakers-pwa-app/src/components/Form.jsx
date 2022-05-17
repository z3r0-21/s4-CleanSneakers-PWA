import React, { useState } from "react";
import Camera from "./Camera";
import {
  Button,
  Modal,
  Figure,
  InputGroup,
  Form,
  ListGroup,
  ProgressBar,
  FormControl,
  Alert,
} from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";

const baseURL = "https://nameless-shelf-91357.herokuapp.com";

  function Form1({ handleModal, showModal }) {

    // todo Plamen: use the apiResponse const to add sneakers. (must)
    // Regardless of the the details being added automatically (Google Vision API) or manually (user filling text field and checkboxes)
    // make sure to use this state to accomodate those details.
    const [sneakersDetails, setSneakerDetails] = useState({ 
        name: '',

        // score of the image search between 0 and 1 where 1 means the Google's API is 100% certain that it is the exact same image
        // todo Plamen: if the score is !=0 display it in a horizontal bar (should)
        score: -1, 
        material: '',
        color: '',

        // indicates if the selected shoes are suitable for rain/snow
        //todo Plamen: add checkboxes for those (must)
        rain: false,
        snow: false 
    })

    function addSneakers(){
      axios.post(baseURL + "/addsneakers", {
        name: sneakersDetails.name,
        material: sneakersDetails.material,
        color: sneakersDetails.color,
        rain: sneakersDetails.rain,
        snow: sneakersDetails.snow
      })
    }

    const setStateFromChild = (data) => { 
        setSneakerDetails(
            {
              name: data.product.displayName, 
              score: data.score, 
              material: data.product.productLabels[0].value,
              color: data.product.productLabels[1].value,
              rain: data.product.productLabels[2].value === "t" ? true : false,
              snow: data.product.productLabels[2].value === "t" ? true : false
            })
     }

  return (
    <>
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Camera setParentState={setStateFromChild}/>
          <div>{sneakersDetails.name}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addSneakers}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Form1;

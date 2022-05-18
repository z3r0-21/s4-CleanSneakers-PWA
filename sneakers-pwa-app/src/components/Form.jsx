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
  const [checked, setChecked] = React.useState(true);


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

  const [showAlert, setShowAlert] = useState(false);

  const handleAlert = () => {
    setShowAlert(!showAlert);
  };

  useEffect(() => {
    if (sneakersDetails.score > 0 && sneakersDetails.score < 0.5) {

      setSneakerDetails({
        name: '',
        score: 0, 
        material: '',
        color: '',
        rain: false,
        snow: false 
      });

      handleAlert();
    }
  },[sneakersDetails])

  function addSneakers(){
    axios.post(baseURL + "/addsneakers", {
      name: sneakersDetails.name,
      material: sneakersDetails.material,
      color: sneakersDetails.color,
      rain: sneakersDetails.rain,
      snow: sneakersDetails.snow
    })
    handleModal()
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




 
    const handleChange =(data) => {
      console.log(data.product.displayName)
  };
  return (
    <>
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Camera setParentState={setStateFromChild}/>
        <ListGroup>
                  <InputGroup onChange={handleChange} className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      Name:
                    </InputGroup.Text>
                    <FormControl
                      defaultValue={sneakersDetails.name}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  
                  {sneakersDetails.score >= 0 && sneakersDetails.score < 0.75 &&
                  <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)}>
                    Could not find any matching sneakers Try again or enter the details manually. 
                     <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Learn how to get more accurate results when using the sneakers scanner.</a>

                  </Alert>
                  }
                  {sneakersDetails.score >= 0.75 &&
                  <p>
                  <ProgressBar
                    now={sneakersDetails.score * 100}
                    label="Matching score"
                  />
                  </p>
                  }

                  
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      Material:
                    </InputGroup.Text>
                    <FormControl
                      defaultValue={sneakersDetails.material}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Color:</InputGroup.Text>
                    <FormControl
                      defaultValue={sneakersDetails.color}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <h5>Weather conditions</h5>
                  <label>
                    Rain
                  </label>
                  <InputGroup.Checkbox checked={sneakersDetails.rain} aria-label="Checkbox for following text input"/>
                  <label>
                    Snow
                  </label>
                  <InputGroup.Checkbox checked={sneakersDetails.snow} aria-label="Checkbox for following text input"/>
                  
                </ListGroup>

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

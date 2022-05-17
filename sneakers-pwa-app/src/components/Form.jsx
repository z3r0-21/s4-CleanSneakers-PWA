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
    const [showAlert, setShowAlert] = useState(false);
    const handleCloseAlert = () => setShowAlert(false);
    const handleShowAlert = () => setShowAlert(true);
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

     const clearFields = () => {
      const noDetails = {
        product: {
          name: "",
          productLabels: ["", "", false, false],
        },
      };
  
      setSneakerDetails(noDetails);
    };
  
    React.useEffect(() => {
      if (sneakersDetails.score < 0.75) {
        handleShowAlert();
      } else {
        handleCloseAlert();
      }
    });
  
  return (
    <>
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Camera setParentState={setStateFromChild}/>
        <ListGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      Sneaker name:
                    </InputGroup.Text>
                    <FormControl
                      defaultValue={sneakersDetails.name}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Score:</InputGroup.Text>
                    <FormControl
                      value={sneakersDetails.score}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <p>
                    {" "}
                    <ProgressBar
                      now={sneakersDetails.score * 100}
                      label="Matching score"
                    />
                  </p>

                  <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)}>
      Your score is under 75% which means there is no match!
       Try again
    </Alert>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      Materials:
                    </InputGroup.Text>
                    <FormControl
                      defaultValue={sneakersDetails.material}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Colors:</InputGroup.Text>
                    <FormControl
                      defaultValue={sneakersDetails.color}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      Suitable:
                    </InputGroup.Text>
                    <FormControl
                      defaultValue={sneakersDetails.name}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <h4>Mark the checkboxes if info is correct</h4>
                  {sneakersDetails.rain ? (
                    <div>Suitable for rain</div>
                  ) : (
                    <div>Not suitable for rain</div>
                  )}
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  {sneakersDetails.snow ? (
                    <div>Suitable for snow</div>
                  ) : (
                    <div>Not suitable for snow</div>
                  )}
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
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

import React, { useState } from "react";
import Camera from './Camera'
import {Button, Modal, Figure, InputGroup, Form, ListGroup, ProgressBar, FormControl, Alert} from 'react-bootstrap'
import { useEffect } from "react";

function Form1() {
  const [show1, setShow1] = useState(false);

  const [showAlert, setShowAlert] = useState(false);


  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);



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

     useEffect(() => {
      if(sneakersDetails.score < 0.75){
        handleShowAlert()
      }

    })







  return (
    <>
    <div className="body">
   <Form className="form">
 {/* The next 6 lines of code are just for testing purposes
        todo Plamen: Implement actual front-end solution and remove them */}
   
      
   <div className="header">

<h1>Add sneakers</h1>

</div>



<div className="buttons">

<Button onClick={handleShow1}>Add new sneakers</Button>

</div>

  





{/* Modal Automaticaly */}
<Modal className='Modal' show={show1} onHide={handleClose1}>
<Modal.Header closeButton>
<Modal.Title>Add automatically</Modal.Title>
</Modal.Header>
<Modal.Body>


<div className='frame'>
<Camera setParentState={setStateFromChild}/>






<ListGroup>
<InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">Sneaker name:</InputGroup.Text>
    <FormControl
      defaultValue={sneakersDetails.name} 
    
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">Score:</InputGroup.Text>
    <FormControl
      value = {sneakersDetails.score}

      aria-describedby="basic-addon1"
    />
    
  </InputGroup>
     
<Alert show={showAlert} variant="success">
        <Alert.Heading>!</Alert.Heading>
        <p>
          Your score is under 75% which means there is no match!
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleCloseAlert} variant="outline-success">
            Close me!
          </Button>
        </div>
      </Alert>

<p>  <ProgressBar now={sneakersDetails.score*100} label="Matching score"  />
</p>

  <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">Materials:</InputGroup.Text>
    <FormControl
      defaultValue = {sneakersDetails.material}

      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">Colors:</InputGroup.Text>
    <FormControl
      defaultValue = {sneakersDetails.color}

      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">Suitable:</InputGroup.Text>
    <FormControl
      defaultValue={sneakersDetails.name} 
  
      aria-describedby="basic-addon1"
    />
  </InputGroup>

<ListGroup.Item>    {sneakersDetails.rain ? <div>suitable for rain</div> : <div>not suitable for rain</div>}
</ListGroup.Item>
<ListGroup.Item>    {sneakersDetails.snow ? <div>suitable for snow</div> : <div>not suitable for snow</div>}
</ListGroup.Item>
</ListGroup>
</div>

</Modal.Body>
<Modal.Footer>
<Button onClick={handleClose1}>Save sneakers</Button>
</Modal.Footer>
</Modal>





     
   </Form>
    </div>


    </>
  )
}

export default Form1
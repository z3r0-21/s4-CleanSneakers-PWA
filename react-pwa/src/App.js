import './App.css';
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { Figure } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';


function App() {

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  return (


    <><div className="header">
      <h1>Add sneakers</h1>

     

    </div>
    
    <div className='buttons'>
        
    <Button onClick={handleShow}>Manually</Button>
        <Button onClick={handleShow1}>Automatically</Button>

        <Modal className='Modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add manually</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Button variant="secondary" onClick={handleClose}>
            Take photo
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Choose from library
          </Button>

          <div className='frame'>

            <Figure.Image
      width={171}
      height={180}
      alt="171x180"
      src="holder.js/171x180"
    />
</div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            
    <p></p>
    <p></p>

    <Form.Label>Title</Form.Label>
    <Form.Control type="title" placeholder="Enter title for sneakers" />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>



  Sun
  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
  Rain
  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
  Snow
  <InputGroup.Checkbox aria-label="Checkbox for following text input" />


        </Modal.Body>
        <Modal.Footer>
         <Button>Add</Button>
        </Modal.Footer>
      </Modal>






      {/* Modal2 */}
      <Modal className='Modal' show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Add automatically</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Button variant="secondary" onClick={handleClose1}>
            Take photo
          </Button> 
          <Button variant="primary" onClick={handleClose1}>
            Choose from library
          </Button>

          <div className='frame'>
          <Figure.Image
    width={171}
    height={180}
    alt="171x180"
    src="holder.js/171x180"
  />
          </div>
          
        </Modal.Body>
        <Modal.Footer>
         <Button onClick={handleShow2}>Continue</Button>
        </Modal.Footer>
      </Modal>






      {/* Modal3 */}
      <Modal   className='Modal' show={show2} onHide={() => { handleClose2(); handleClose1();}}>
        <Modal.Header closeButton>
          <Modal.Title>Add automatically</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Is this the right shoe?</h4>
        <div className='frame'>
        <Figure.Image
    width={171}
    height={180}
    alt="171x180"
    src="holder.js/171x180"
  />
        </div>

          No, this is not the right shoe
          <InputGroup.Checkbox  />
          Not sure if this is the right one
          <InputGroup.Checkbox aria-label="Checkbox for following text input" />
          Yes, this is the right shoe
          <InputGroup.Checkbox aria-label="Checkbox for following text input" />

        </Modal.Body>
        <Modal.Footer>
         <Button>Continue</Button>
        </Modal.Footer>
      </Modal>
      </div></>
   
  );
}

export default App;

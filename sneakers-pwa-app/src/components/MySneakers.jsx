import React, { useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import {Card, Button, Row} from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faSnowflake, faDroplet } from '@fortawesome/free-solid-svg-icons'
import Form1 from "./Form";
const baseURL = "https://nameless-shelf-91357.herokuapp.com";

function MySneakers() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [sneakers, setSneakers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    getMySneakers();
  }, []);

  function getMySneakers() {
    axios.get(baseURL + "/sneakers").then((response) => {
      setSneakers(response.data);
    });
  }

  const setModalState = () => {
    setShowModal(!showModal);
  };

    return (
        <>
        <Row className="text-center">
            <h1 className="mt-4 mb-3">My sneakers</h1>
            <Button onClick={setModalState}>Add new sneakers</Button>
        </Row>

        <Form1 handleModal={setModalState} showModal={showModal}/>

        <ul className="list-unstyled">
            {sneakers.map(sneaker => 
            <li key={sneaker.id}>
                <Card className="text-center my-3 mx-5">
                <Card.Body>
                    <Card.Title>{sneaker.sneaker_name}</Card.Title>
                    <Card.Text>
                    {sneaker.color} / {sneaker.material}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <span>
                {sneaker.color !== "black" && sneaker.material !== "leather" &&
                    <FontAwesomeIcon icon={faSun} className="mx-2"/>
                }
                {sneaker.rain === 1 &&
                    <FontAwesomeIcon icon={faDroplet} className="mx-2"/>
                }
                {sneaker.snow === 1 &&
                    <FontAwesomeIcon icon={faSnowflake} className="mx-2"/>
                }
                {sneaker.color === "black" && sneaker.material === "leather" && sneaker.snow === 0 && sneaker.rain === 0 &&
                    <p className="text-muted">Not suitable for any weather type...</p>
                }
                </span>
                </Card.Footer>
                </Card>
            </li>
            )}
        </ul>
        </>
    )
}

export default MySneakers;

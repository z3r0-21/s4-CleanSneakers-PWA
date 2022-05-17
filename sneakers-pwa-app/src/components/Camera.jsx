
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import {Button} from 'react-bootstrap'

function Camera({ setParentState }) {
  let videoRef = useRef(null);
  let photoRef = useRef(null);

  const postRequest = (image) => {
        axios.post("https://nameless-shelf-91357.herokuapp.com/api/searchImages", {
          base64: image.split("base64,")[1]
        })
          .then((response) => { 
           setParentState(response.data[0])
          });
      }

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };
 
  const takePicture = () => {

    const width = 400
    const height = width / (4 / 3)
    
    let video = videoRef.current
 
    let photo = photoRef.current
 
    photo.width = width
 
    photo.height = height
 
    let ctx = photo.getContext('2d')
 
    ctx.drawImage(video, 0, 0, width, height)
    postRequest(photo.toDataURL());
    
  }
 
  const clearImage = () => {

    let photo = photoRef.current
 
    let ctx = photo.getContext('2d')
 
    ctx.clearRect(0,0,photo.width,photo.height)

    const noDetails = {
        product:{
          name: '',
          productLabels: ['','', false, false]
        },
        score: -1
      }

      setParentState(noDetails)
  }
 
  useEffect(() => { 
    getVideo();
  }, [videoRef]);
  
  //todo Plamen: add Submit button that clear the form (regardless of it being auto or manually filled; use the clearImage method) (must)
  //todo Dimitar: add submitted sneakers to database (should)
  return (
      <>
      {/* 
        This is the video stream from the camera.
        As for now, it can not be hidden even if the user has taken a picture

        todo Dimitar: make it so the video stream does not show up after taking picture (could)
       */}
      
      
      <video className="video" ref={videoRef} ></video>
      <Button className="buttontakepicture" onClick={takePicture}>Take Picture</Button>
      <Button className="buttonclearimage" onClick={clearImage}>Clear Image</Button>
      <canvas className="canvas" ref={photoRef}></canvas>
      
      </>
  );
}
 
export default Camera;
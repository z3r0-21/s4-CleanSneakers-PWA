
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';

function Camera() {
  let videoRef = useRef(null);
  let photoRef = useRef(null);

  // todo Plamen: use the apiResponse const to add sneakers. 
  // Regardless of the the details being added automatically (Google Vision API) or manually (user filling text field and checkboxes)
  // make sure to use this state to accomodate those details.

  const [sneakersDetails, setSneakerDetails] = useState({ 
    name: '',

    // score of the image search between 0 and 1 where 1 means the Google's API is 100% certain that it is the exact same image
    // todo Plamen: if the score is !=0 display it in a horizontal bar
    score: -1, 
    material: '',
    color: '',

    // indicated if the selected shoes are suitable for rain/snow
    //todo Plamen: add checkboxes for those
    rain: false,
    snow: false 
  })
  

  const postRequest = (image) => {
        console.log(image.split("base64,")[1])
        axios.post("https://nameless-shelf-91357.herokuapp.com/api/searchImages", {
          base64: image.split("base64,")[1]
        })
          .then((response) => { 
           // const data = response.data[0];
           console.log(response)
           setSneakerDetails(
              {
                name: response.data[0].product.displayName, 
                score: response.data[0].score, 
                material: response.data[0].product.productLabels[0].value,
                color: response.data[0].product.productLabels[1].value,
                rain: response.data[0].product.productLabels[2].value === "t" ? true : false,
                snow: response.data[0].product.productLabels[2].value === "t" ? true : false
              })
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

    setSneakerDetails(
      {
        name: '',
        score: -1, 
        material: '',
        color: '',
        rain: false,
        snow: false
      })

  }
 
  useEffect(() => { 
    getVideo();
  }, [videoRef]);
  
  //todo Plamen: add Submit button that clear the form (regardless of it being auto or manually filled; use the clearImage method)
  //todo Dimitar: add submitted sneakers to database
  return (
      <>
      {/* 
        This is the video stream from the camera.
        As for now, it can not be hidden even if the user has taken a picture

        todo Dimitar: make it so the video stream does not show up after taking picture
       */}
      <video ref={videoRef} ></video>
      <button onClick={takePicture}>Take Picture</button>
      <canvas ref={photoRef}></canvas>
      <button onClick={clearImage}>Clear Image</button>
      </>
  );
}
 
export default Camera;
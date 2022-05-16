import React, { useState } from "react";
import Camera from './Camera'

function Form() {

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
  return (
    <>
    <Camera setParentState={setStateFromChild}/>

    {/* The next 6 lines of code are just for testing purposes
        todo Plamen: Implement actual front-end solution and remove them */}
    <div>{sneakersDetails.name}</div>
    <div>{sneakersDetails.score}</div>
    <div>{sneakersDetails.material}</div>
    <div>{sneakersDetails.color}</div>
    {sneakersDetails.rain ? <div>suitable for rain</div> : <div>not suitable for rain</div>}
    {sneakersDetails.snow ? <div>suitable for snow</div> : <div>not suitable for snow</div>}

    </>
  )
}

export default Form
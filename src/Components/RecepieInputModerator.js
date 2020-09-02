import React, { useState } from 'react';
import InputIngredients from './InputIngredients';
import InputDescription from './InputDescription';
import '../App.css';


function RecepieInputModerator() {

  const [ titleInput, setTitleInput ] = useState("");
  const [ categoryInput, setCategoryInput ] = useState("");
  const [ ingredientsInput, setIngredientsInput ] = useState([]);
  const [ descriptionInput, setDescriptionInput ] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit will be handled here");
  }

  const handleChange = (e) => {
    e.preventDefault();
    console.log("Change will be handled here");
  }

  return (
    <div className="recepie-input-moderator">

      <form onSubmit={handleSubmit}>

        <div className="input-title">
          <label><p>Titel</p>
            <input type="text" name="title" placeholder="Västerbottenpaj" value={titleInput} onChange={(e => setTitleInput(e.target.value)) }/>
          </label> 
        </div>  

        <div className="input-category">         
          <label htmlFor="Nöt"><p>Nötkött</p>
            <input type="radio" id="Nöt" name="category" value="1" />
          </label> 
          <label htmlFor="Fläsk"><p>Fläsk</p>
            <input type="radio" id="Fläsk" name="category" value="5" />
          </label> 
          <label htmlFor="Fågel"><p>Fågel</p>
            <input type="radio" id="Fågel" name="category" value="2" />
          </label> 
          <label htmlFor="Fisk"><p>Fisk</p>
            <input type="radio" id="Fisk" name="category" value="3" />
          </label> 
          <label htmlFor="Vegetariskt"><p>Vegetariskt</p>
            <input type="radio" id="Vegetariskt" name="category" value="4" />
          </label> 
        </div>

        <InputIngredients />
        
        <InputDescription />

        <button type="submit" name="submit">Lägg in recept</button>
      </form>
 
    </div>
  );
}

export default RecepieInputModerator;
import React, { useState } from 'react';
import IngredientInput from './IngredientInput';
import DescriptionInput from './DescriptionInput';
import CategoryInput from './CategoryInput';
import AddedIngredient from './AddedIngredient';
import AddedDescriptionRow from './AddedDescriptionRow';
import '../App.css';


function RecepieInputModerator() {

  const [ titleInput, setTitleInput ] = useState("");
  const [ categoryInput, setCategoryInput ] = useState("");

  const [ currentIngredientIndex, setCurrentIngredientIndex ] = useState(null);
  const [ ingredientName, setIngredientName ] = useState("");
  const [ ingredientAmount, setIngredientAmount ] = useState("");
  const [ ingredientUnit, setIngredientUnit ] = useState("");
  const [ ingredientDetails, setIngredientDetails ] = useState("");
  
  const [ currentDescriptionRowIndex, setCurrentDescriptionRowIndex ] = useState(null);
  const [ descriptionRowInput, setDescriptionRowInput ] = useState("");

  const [ addedIngredients, setAddedIngredients ] = useState([]);
  const [ addedDescriptionRows, setAddedDescriptionRows ] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit will be handled here");
  }

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setCategoryInput(e.target.value);
  }

  const handleIngredientChange = (e) => {
    e.preventDefault();
    const target = e.target.name;
    const value = e.target.value;
    if (target === "name") {
      setIngredientName(value);
    } else if (target === "amount") {
      setIngredientAmount(value);
    } else if (target === "unit") {
      setIngredientUnit(value);
    } else if (target === "details") {
      setIngredientDetails(value);
    } 
  }

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescriptionRowInput(e.target.value);
  }

  const addIngredient = () => {
    const id = currentIngredientIndex === null ? addedIngredients.length + 1 : currentIngredientIndex;
    const ingredientObject = {
      id: id,
      name: ingredientName,
      amount: ingredientAmount,
      unit: ingredientUnit,
      details: ingredientDetails
    }
    let allIngredients = [...addedIngredients];
    if (currentIngredientIndex === null) {
      allIngredients.push(ingredientObject);
    } else {
      allIngredients.splice((currentIngredientIndex - 1), 1, ingredientObject);
    }
    setAddedIngredients(allIngredients);
    clearIngredientsInput();
  }

  const clearIngredientsInput = () => {
    setCurrentIngredientIndex(null);
    setIngredientName("");
    setIngredientAmount("");
    setIngredientUnit("");
    setIngredientDetails("");
  }

  const clearDescriptionRowInput = () => {
    setCurrentDescriptionRowIndex(null);
    setDescriptionRowInput("");
  }

  const setIngredientEditMode = (index) => {
    let ingredientToEdit = addedIngredients.filter((item) => {
      return item.id === index;
    })
    setCurrentIngredientIndex(ingredientToEdit[0].id);
    setIngredientName(ingredientToEdit[0].name);
    setIngredientAmount(ingredientToEdit[0].amount);
    setIngredientUnit(ingredientToEdit[0].unit);
    setIngredientDetails(ingredientToEdit[0].details);
  }

  const setDescriptionEditMode = (index) => {
    let descriptionRowToEdit = addedDescriptionRows.filter((item) => {
      return item.id === index;
    })
    setCurrentDescriptionRowIndex(descriptionRowToEdit[0].id);
    setDescriptionRowInput(descriptionRowToEdit[0].description);
  }

  const addDescriptionRow = () => {
    const id = currentDescriptionRowIndex === null ? addedDescriptionRows.length + 1 : currentDescriptionRowIndex;
    const descriptionRowObject = {
      id: id,
      description: descriptionRowInput
    }
    let allDescriptionRows = [...addedDescriptionRows];
    if (currentDescriptionRowIndex === null) {
      allDescriptionRows.push(descriptionRowObject);
    } else {
      allDescriptionRows.splice((currentDescriptionRowIndex - 1), 1, descriptionRowObject);
    }
    setAddedDescriptionRows(allDescriptionRows);
    clearDescriptionRowInput();
  }

 const allAddedIngredients = addedIngredients.map((item) => {
      return <AddedIngredient key={item.id} 
                              name={item.name} 
                              amount={item.amount} 
                              unit={item.unit} 
                              details={item.details} 
                              setEditMode={() => setIngredientEditMode(item.id)}/> 
 });
 
  const allAddedDescriptionRows = addedDescriptionRows.map((item) => {
   return <AddedDescriptionRow  key={item.id} 
                                description={item.description}
                                setEditMode={() => setDescriptionEditMode(item.id)}/>
 })

  return (
    <div className="recepie-input-moderator">

      <form onSubmit={handleSubmit}>

        <div className="title-input">
          <label>
            <input type="text" 
                  name="title" placeholder="Vad heter maträtten?" value={titleInput} autoComplete="off" onChange={(e => setTitleInput(e.target.value)) }/>
          </label> 
        </div>  

        <CategoryInput handleChange={handleCategoryChange}/>

        <IngredientInput  handleChange={handleIngredientChange} 
                          addIngredient={addIngredient} 
                          name={ingredientName} 
                          amount={ingredientAmount} 
                          unit={ingredientUnit} 
                          details={ingredientDetails}/>
        
        {allAddedIngredients}

        <DescriptionInput handleChange={handleDescriptionChange} 
                          addDescriptionRow={addDescriptionRow} 
                          value={descriptionRowInput}/>
 
        {allAddedDescriptionRows}

        <button type="submit" name="submit">Klar</button>

      </form>
 
    </div>
  );
}

export default RecepieInputModerator;
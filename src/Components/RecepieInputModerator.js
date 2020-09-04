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

  const [ currentIngredient, setCurrentIngredient ] = useState(null);
  const [ ingredientName, setIngredientName ] = useState("");
  const [ ingredientAmount, setIngredientAmount ] = useState("");
  const [ ingredientUnit, setIngredientUnit ] = useState("");
  const [ ingredientDetails, setIngredientDetails ] = useState("");
  
  const [ currentDescriptionRow, setCurrentDescriptionRow ] = useState(null);
  const [ descriptionRowInput, setDescriptionRowInput ] = useState("");

  const [ addedIngredients, setAddedIngredients ] = useState([]);
  const [ addedDescriptionRows, setAddedDescriptionRows ] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit will be handled here");
  }

  const handleCategoryChange = (e) => {
    setCategoryInput(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescriptionRowInput(e.target.value);
  }

  const getNewId = (list) => {
    let highestIdInList = 0; 
    for(let i=0; i < list.length; i++) {
      if (list[i].id > highestIdInList) {
        highestIdInList = list[i].id;
      }
    }
    return highestIdInList + 1;
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

  const addIngredient = () => {
    const id = currentIngredient === null ? getNewId(addedIngredients) : currentIngredient;
    const ingredientObject = {
      id: id,
      name: ingredientName,
      amount: ingredientAmount,
      unit: ingredientUnit,
      details: ingredientDetails
    }
    let allIngredients = [...addedIngredients];
    if (currentIngredient === null) {
      allIngredients.push(ingredientObject);
    } else {
      let index = allIngredients.findIndex(ingredient => ingredient.id === currentIngredient);
      allIngredients.splice((index), 1, ingredientObject); 
    }
    setAddedIngredients(allIngredients);
    clearIngredientsInput();
  }


  const deleteIngredient = (id) => {
    let allIngredients = [...addedIngredients];
    let index = allIngredients.findIndex(ingredient => ingredient.id === id);
    allIngredients.splice(index, 1); 
    setAddedIngredients(allIngredients);
  }


  const setIngredientEditMode = (id) => {
    let ingredientToEdit = addedIngredients.filter((item) => {
      return item.id === id;
    })
    setCurrentIngredient(ingredientToEdit[0].id);
    setIngredientName(ingredientToEdit[0].name);
    setIngredientAmount(ingredientToEdit[0].amount);
    setIngredientUnit(ingredientToEdit[0].unit);
    setIngredientDetails(ingredientToEdit[0].details);
  }


  const clearIngredientsInput = () => {
    setCurrentIngredient(null);
    setIngredientName("");
    setIngredientAmount("");
    setIngredientUnit("");
    setIngredientDetails("");
  }


  const addDescriptionRow = () => {
    const id = currentDescriptionRow === null ? getNewId(addedDescriptionRows) : currentDescriptionRow;
    const descriptionRowObject = {
      id: id,
      description: descriptionRowInput
    }
    let allDescriptionRows = [...addedDescriptionRows];
    if (currentDescriptionRow === null) {
      allDescriptionRows.push(descriptionRowObject);
    } else {
      let index = allDescriptionRows.findIndex(row => row.id === currentDescriptionRow);
      allDescriptionRows.splice((index), 1, descriptionRowObject); 
    }
    setAddedDescriptionRows(allDescriptionRows);
    clearDescriptionRowInput();
  }


  const deleteDescriptionRow = (id) => {
    let allDescriptionRows = [...addedDescriptionRows];
    let index = allDescriptionRows.findIndex(row => row.id === id);
    allDescriptionRows.splice(index, 1); 
    setAddedDescriptionRows(allDescriptionRows);
  }


  const setDescriptionEditMode = (id) => {
    let descriptionRowToEdit = addedDescriptionRows.filter((item) => {
      return item.id === id;
    })
    setCurrentDescriptionRow(descriptionRowToEdit[0].id);
    setDescriptionRowInput(descriptionRowToEdit[0].description);
  }


  const clearDescriptionRowInput = () => {
    setCurrentDescriptionRow(null);
    setDescriptionRowInput("");
  }



 const allAddedIngredients = addedIngredients.map((item) => {
      return <AddedIngredient key={item.id} 
                              name={item.name} 
                              amount={item.amount} 
                              unit={item.unit} 
                              details={item.details} 
                              setEditMode={() => setIngredientEditMode(item.id)}
                              deleteIngredient={() => deleteIngredient(item.id)}/> 
 });
 
  const allAddedDescriptionRows = addedDescriptionRows.map((item) => {
   return <AddedDescriptionRow  key={item.id} 
                                description={item.description}
                                setEditMode={() => setDescriptionEditMode(item.id)}
                                deleteDescriptionRow={() => deleteDescriptionRow(item.id)}/>
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
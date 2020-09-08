import React, { useState } from 'react';
import IngredientInput from './IngredientInput';
import DescriptionInput from './DescriptionInput';
import CategoryInput from './CategoryInput';
import AddedIngredient from './AddedIngredient';
import AddedDescriptionRow from './AddedDescriptionRow';
import IconArtistAttribute from './IconArtistAttribute';
import '../App.css';


function RecepieInputModerator() {

  const [ titleInput, setTitleInput ] = useState("");
  const [ categoryInput, setCategoryInput ] = useState("");

  const [ ingredientName, setIngredientName ] = useState("");
  const [ ingredientAmount, setIngredientAmount ] = useState("");
  const [ ingredientUnit, setIngredientUnit ] = useState("");
  const [ ingredientDetails, setIngredientDetails ] = useState("");
  const [ descriptionRowInput, setDescriptionRowInput ] = useState("");

  const [ currentIngredient, setCurrentIngredient ] = useState(null);
  const [ currentDescriptionRow, setCurrentDescriptionRow ] = useState(null);

  const [ addedIngredients, setAddedIngredients ] = useState([]);
  const [ addedDescriptionRows, setAddedDescriptionRows ] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit will be handled here");
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


  const handleCategoryChange = (e) => {
    setCategoryInput(e.target.value);
  }


  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescriptionRowInput(e.target.value);
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
    if (ingredientName === "") { return };
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


  const addDescriptionRow = () => {
    if (descriptionRowInput === "") { return };
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


  const deleteIngredient = (id) => {
    let allIngredients = [...addedIngredients];
    let index = allIngredients.findIndex(ingredient => ingredient.id === id);
    allIngredients.splice(index, 1); 
    setAddedIngredients(allIngredients);
    if (currentIngredient === id) {
      clearIngredientsInput();
    }
  }


  const deleteDescriptionRow = (id) => {
    let allDescriptionRows = [...addedDescriptionRows];
    let index = allDescriptionRows.findIndex(row => row.id === id);
    allDescriptionRows.splice(index, 1); 
    setAddedDescriptionRows(allDescriptionRows);
    if (currentDescriptionRow === id) {
      clearDescriptionRowInput();
    }
  }


  const toggleIngredientEditMode = (id) => {
    if (currentIngredient === null || currentIngredient !== id) {
      let ingredientToEdit = addedIngredients.find((item) => {
        return item.id === id;
      });
      setCurrentIngredient(ingredientToEdit.id);
      setIngredientName(ingredientToEdit.name);
      setIngredientAmount(ingredientToEdit.amount);
      setIngredientUnit(ingredientToEdit.unit);
      setIngredientDetails(ingredientToEdit.details);
    } else {
      clearIngredientsInput();
    }
  }


  const toggleDescriptionEditMode = (id) => {
    if (currentDescriptionRow === null || currentDescriptionRow !== id) {
      let descriptionRowToEdit = addedDescriptionRows.find((item) => {
        return item.id === id;
      })
      setCurrentDescriptionRow(descriptionRowToEdit.id);
      setDescriptionRowInput(descriptionRowToEdit.description);
    } else {
      clearDescriptionRowInput();
    }
  }


  const clearIngredientsInput = () => {
    setCurrentIngredient(null);
    setIngredientName("");
    setIngredientAmount("");
    setIngredientUnit("");
    setIngredientDetails("");
  }


  const clearDescriptionRowInput = () => {
    setCurrentDescriptionRow(null);
    setDescriptionRowInput("");
  }


  const handleEnter = (e) => {
    let source = e.target.name;
    if (e.key === "Enter") {
      if (source === "name" || source === "unit" || source === "amount" || source === "details") {
        addIngredient();
      } else if (source === "description") {
        addDescriptionRow();
      } 
    }
  }



 const allAddedIngredients = addedIngredients.map((item) => {
      return <AddedIngredient key={item.id} 
                              id={item.id}
                              name={item.name} 
                              amount={item.amount} 
                              unit={item.unit} 
                              details={item.details} 
                              currentIngredient={currentIngredient}
                              toggleEditMode={() => toggleIngredientEditMode(item.id)}
                              deleteIngredient={() => deleteIngredient(item.id)}/> 
 });
 
  const allAddedDescriptionRows = addedDescriptionRows.map((item) => {
   return <AddedDescriptionRow  key={item.id} 
                                id={item.id}
                                description={item.description}
                                currentDescriptionRow={currentDescriptionRow}
                                toggleEditMode={() => toggleDescriptionEditMode(item.id)}
                                deleteDescriptionRow={() => deleteDescriptionRow(item.id)}/>
 })

  return (
    <div className="recepie-input-moderator">

      <form onSubmit={handleSubmit}>

        <div className="title-input">
          <label>
            <input type="text" 
                  name="title" placeholder="Vad heter maträtten?" value={titleInput} autoComplete="off" onChange={(e => setTitleInput(e.target.value))}/>
          </label> 
        </div>  

        <CategoryInput handleChange={handleCategoryChange}/>

        <IngredientInput  handleChange={handleIngredientChange} 
                          addIngredient={addIngredient}
                          handleEnter={handleEnter} 
                          name={ingredientName} 
                          amount={ingredientAmount} 
                          unit={ingredientUnit} 
                          details={ingredientDetails}/>
        
        <div className="added-items-list">{allAddedIngredients}</div>

        <DescriptionInput handleChange={handleDescriptionChange} 
                          addDescriptionRow={addDescriptionRow} 
                          handleEnter={handleEnter} 
                          value={descriptionRowInput}/>
 
        <div className="added-items-list">{allAddedDescriptionRows}</div>

        <button type="submit" name="submit">Klar</button>

      </form>
    
      <IconArtistAttribute />

    </div>
  );
}

export default RecepieInputModerator;
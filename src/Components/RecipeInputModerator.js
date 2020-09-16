import React, { useState, useEffect } from 'react';
import TitleInput from './TitleInput';
import IngredientInput from './IngredientInput';
import DescriptionInput from './DescriptionInput';
import CategoryInput from './CategoryInput';
import AddedRecipeItem from './AddedRecipeItem';
import IconArtistAttribute from './IconArtistAttribute'; 


function RecipeInputModerator() {

  const [ titleInput, setTitleInput ] = useState("");
  const [ categoryInput, setCategoryInput ] = useState("");

  const [ ingredientName, setIngredientName ] = useState("");
  const [ ingredientAmount, setIngredientAmount ] = useState("");
  const [ ingredientUnit, setIngredientUnit ] = useState("");
  const [ ingredientDetails, setIngredientDetails ] = useState("");
  const [ descriptionRowInput, setDescriptionRowInput ] = useState("");

  const [ currentIngredient, setCurrentIngredient ] = useState(null);
  const [ currentDescriptionRow, setCurrentDescriptionRow ] = useState(null);
  const [ tooltipTarget, setTooltipTarget ] = useState("");

  const [ addedIngredients, setAddedIngredients ] = useState([]);
  const [ addedDescriptionRows, setAddedDescriptionRows ] = useState([]);


  const titleFocus = React.createRef();
  const ingredientFocus = React.createRef();
  const descriptionFocus = React.createRef();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit will be handled here");
  }

  const manageInputFocus = (refName) => {
    refName.current.focus();
  }

  useEffect(() => {
    manageInputFocus(titleFocus);
  }, []);

  const showTooltip = (source) => {
    setTooltipTarget(source);
  }

  const hideTooltip = () => {
    setTooltipTarget("");
  }


  const getNewId = (list) => {
    let highestIdInList = 0; 
    for (let i=0; i < list.length; i++) {
      if (list[i].id > highestIdInList) {
        highestIdInList = list[i].id;
      }
    }
    return highestIdInList + 1;
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


  const clearEditMode = () => {
    if (currentIngredient !== null) {
      clearIngredientsInput();
    } else if (currentDescriptionRow !== null) {
      clearDescriptionRowInput();
    }
  }


  const handleTitleChange = (e) => {
    setTitleInput(e.target.value);
    clearEditMode();
    if (tooltipTarget !== "") { hideTooltip(); }
  }


  const handleCategoryChange = (categoryId) => {
    setCategoryInput(categoryId);
    clearEditMode();
    manageInputFocus(ingredientFocus);
    if (tooltipTarget !== "") { hideTooltip(); }
  }


  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescriptionRowInput(e.target.value);
    if (tooltipTarget !== "") { hideTooltip(); }
    if (currentIngredient !== null) { clearIngredientsInput(); }
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
    if (tooltipTarget !== "") { hideTooltip(); }
    if (currentDescriptionRow !== null) { clearDescriptionRowInput(); }
  }


  const addIngredient = () => {
    if (ingredientName === "") { 
      showTooltip("ingredient");
      manageInputFocus(ingredientFocus);
      if (currentDescriptionRow !== null) { clearEditMode(); };
      return; 
    };
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
    if (currentDescriptionRow !== null) { clearDescriptionRowInput(); }
    manageInputFocus(ingredientFocus);
  }


  const addDescriptionRow = () => {
    if (descriptionRowInput === "") { 
      showTooltip("description");
      manageInputFocus(descriptionFocus);
      if (currentIngredient !== null) { clearEditMode(); }
      return; 
    } 
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
    if (currentIngredient !== null) { clearIngredientsInput(); }
    manageInputFocus(descriptionFocus);
  }


  const handleEnter = (e) => {
    if (e.key === "Enter") {
      let source = e.target.name;
      if (source === "name" || source === "unit" || source === "amount" || source === "details") {
        addIngredient();
      } else if (source === "description") {
        addDescriptionRow();
      } else if (source === "Nöt" || source === "Fläsk" || source === "Fågel" || source === "Fisk" || source === "Veg" ) {
        handleCategoryChange(e.target.id);
      }
    }
  }


  const deleteIngredient = (id) => {
    let allIngredients = [...addedIngredients];
    let index = allIngredients.findIndex(ingredient => ingredient.id === id);
    allIngredients.splice(index, 1); 
    setAddedIngredients(allIngredients);
    manageInputFocus(ingredientFocus);
    if (tooltipTarget !== "") { hideTooltip(); }
    clearEditMode();
  }


  const deleteDescriptionRow = (id) => {
    let allDescriptionRows = [...addedDescriptionRows];
    let index = allDescriptionRows.findIndex(row => row.id === id);
    allDescriptionRows.splice(index, 1); 
    setAddedDescriptionRows(allDescriptionRows);
    manageInputFocus(descriptionFocus);
    if (tooltipTarget !== "") { hideTooltip(); }
    clearEditMode();
  }


  const toggleIngredientEditMode = (id) => {
    if (tooltipTarget !== "") { hideTooltip(); }
    if (currentDescriptionRow !== null) { clearDescriptionRowInput(); }
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
    manageInputFocus(ingredientFocus);
  }


  const toggleDescriptionEditMode = (id) => {
    if (tooltipTarget !== "") { hideTooltip(); }
    if (currentIngredient !== null) { clearIngredientsInput(); } 
    if (currentDescriptionRow === null || currentDescriptionRow !== id) {
      let descriptionRowToEdit = addedDescriptionRows.find((item) => {
        return item.id === id;
      })
      setCurrentDescriptionRow(descriptionRowToEdit.id);
      setDescriptionRowInput(descriptionRowToEdit.description);
    } else {
      clearDescriptionRowInput();
    }
    manageInputFocus(descriptionFocus);
  }


 const ingredientEditMode = currentIngredient !== null ? true : false;
 const descriptionEditMode = currentDescriptionRow !== null ? true : false;
 const ingredientTooltip = tooltipTarget === "ingredient" ? true : false;
 const descriptionTooltip = tooltipTarget === "description" ? true : false;

 const allAddedIngredients = addedIngredients.map((item) => {
      return <AddedRecipeItem   key={item.id} 
                                id={item.id}
                                content={`${item.amount} ${item.unit} ${item.name} ${item.details}`}  
                                currentItem={currentIngredient}
                                toggleEditMode={() => toggleIngredientEditMode(item.id)}
                                deleteItem={() => deleteIngredient(item.id)}/>
 });
 
  const allAddedDescriptionRows = addedDescriptionRows.map((item) => {
      return <AddedRecipeItem   key={item.id} 
                                id={item.id}
                                content={item.description}
                                currentItem={currentDescriptionRow}
                                toggleEditMode={() => toggleDescriptionEditMode(item.id)}
                                deleteItem={() => deleteDescriptionRow(item.id)}/>
 })

  return (
    <div className="recipe-input-moderator-container"> 
      <div className="recipe-input-moderator">

        <form onSubmit={handleSubmit}>

          <TitleInput titleInput={titleInput} handleChange={handleTitleChange} titleFocus={titleFocus}/>

          <CategoryInput handleChange={handleCategoryChange} selectedCategory={categoryInput} handleEnter={handleEnter} />

          <IngredientInput  handleChange={handleIngredientChange} 
                            addIngredient={addIngredient}
                            handleEnter={handleEnter} 
                            hideTooltip={hideTooltip}
                            name={ingredientName} 
                            amount={ingredientAmount} 
                            unit={ingredientUnit} 
                            details={ingredientDetails}
                            inputFocus={ingredientFocus}
                            showTooltip={ingredientTooltip}
                            editMode={ingredientEditMode}/>
          
          <div className="added-items-list">{allAddedIngredients}</div>

          <DescriptionInput handleChange={handleDescriptionChange} 
                            addDescriptionRow={addDescriptionRow} 
                            handleEnter={handleEnter} 
                            hideTooltip={hideTooltip}
                            value={descriptionRowInput}
                            inputFocus={descriptionFocus}
                            showTooltip={descriptionTooltip}
                            editMode={descriptionEditMode}/>
  
          <div className="added-items-list">{allAddedDescriptionRows}</div>

        </form>
        
      </div>

      <button type="submit" name="submit" className="recipe-input-submit-button">Klar</button>
      <IconArtistAttribute />

    </div>
  );
}

export default RecipeInputModerator;

 
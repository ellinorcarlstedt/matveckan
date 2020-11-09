import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import useCustomRef from "../../shared/hooks/ref-hook";
import Background from "../../shared/UIElements/Background";
import Modal from "../../shared/UIElements/Modal";
import Button from '../../shared/UIElements/Button';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import ErrorMessage from '../../shared/UIElements/ErrorMessage';
import TitleInput from '../components/TitleInput';
import IngredientInput from '../components/IngredientInput';
import DescriptionInput from '../components/DescriptionInput';
import CategoryInput from '../components/CategoryInput';
import Recipe from '../../menu/components/Recipe';
import AddedRecipeItem from '../components/AddedRecipeItem';
import ArtistAttribute from '../../shared/UIElements/ArtistAttribute'; 


const RecipeInputModerator = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [ title, setTitle ] = useState("");
  const [ category, setCategory ] = useState(null);
  const [ ingredient, setIngredient ] = useState({ name: "", amount: "", unit: "", details: ""});
  const [ description, setDescription ] = useState("");

  const [ currentIngredient, setCurrentIngredient ] = useState(null);
  const [ currentDescriptionRow, setCurrentDescriptionRow ] = useState(null);

  const [ addedIngredients, setAddedIngredients ] = useState([]);
  const [ addedDescriptionRows, setAddedDescriptionRows ] = useState([]);

  const [ tooltipTarget, setTooltipTarget ] = useState("");
  const [ errorMessage, setErrorMessage] = useState("");
  const [ postedRecipe, setPostedRecipe] = useState("");

  const titleFocus = useCustomRef();
  const ingredientFocus = useCustomRef();
  const descriptionFocus = useCustomRef();

  const handleSubmit = async event => {
    event.preventDefault();
    clearErrorMessage();
    clearEditMode();
    let validInput = false;
    validInput = validateInput();
    if (!validInput) { 
        return; 
    } else {
        try {
          const response = await sendRequest(
            "http://localhost:5000/api/recipes",
            "POST",
            JSON.stringify({
              mealName: title,
              mealCategory: category,
              ingredients: addedIngredients,
              description: addedDescriptionRows,
              creator: auth.userId
            }),
            { 
              "Content-Type" : "application/json"
            }
            );
            setPostedRecipe(response.recipe);
            clearTitleInput();
            clearCategoryInput();
            clearIngredientsInput();
            cleardescriptionInput();
            setAddedIngredients([]);
            setAddedDescriptionRows([]);
        } catch (err) {}
    }
  }

  const manageInputFocus = (refName) => {
      refName.current.focus();
  }

  useEffect(() => {
    if (titleFocus) {
      manageInputFocus(titleFocus);
    }
  }, [titleFocus]);

  const showTooltip = (source) => {
    setTooltipTarget(source);
  }

  const hideTooltip = () => {
    setTooltipTarget("");
  }

  const clearTooltip = () => {
    if (tooltipTarget !== "") { hideTooltip(); }
  }

  const showError = (message) => {
    setErrorMessage(message);
  }

  const hideError = () => {
      setErrorMessage("");
  }

  const clearErrorMessage = () => {
      if (errorMessage) { 
          hideError() }
  }

  const validateInput = () => {
    if(title === "") {
        showError("Du behöver ange maträttens namn.");
        manageInputFocus(titleFocus);
    } else if (category === null) {
        showError("Du behöver ange en kategori för receptet - klicka på en av symbolerna.");
    } else if(!addedIngredients.length) {
        showError("Lägg till minst en ingrediens.");
        manageInputFocus(ingredientFocus);
    } else if(!addedDescriptionRows.length) {
        showError("Lägg till minst en beskrivningspunkt.");
        manageInputFocus(descriptionFocus);
    } else {
        return true;
    }
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


  const clearTitleInput = () => {
    setTitle("");
  }

  const clearCategoryInput = () => {
    setCategory(null);
  }

  const clearIngredientsInput = () => {
    setCurrentIngredient(null);
    setIngredient({ 
      name: "", 
      amount: "", 
      unit: "", 
      details: ""
    });
  }


  const cleardescriptionInput = () => {
    setCurrentDescriptionRow(null);
    setDescription("");
  }


  const clearEditMode = () => {
    if (currentIngredient !== null) {
      clearIngredientsInput();
    } else if (currentDescriptionRow !== null) {
      cleardescriptionInput();
    }
  }


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    clearTooltip();
    clearErrorMessage();
  }


  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
    clearTooltip();
    clearErrorMessage();
  }


  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
    clearTooltip();
    clearErrorMessage();
    if (currentIngredient !== null) { clearIngredientsInput(); }
  }


  const handleIngredientChange = (e) => {
    e.preventDefault();
    const target = e.target.name;
    const value = e.target.value;
    setIngredient({ ...ingredient, [target]: value }); 
    clearTooltip();
    clearErrorMessage();
    if (currentDescriptionRow !== null) { cleardescriptionInput(); }
  }


  const addIngredient = () => {
    clearErrorMessage();
    if (ingredient.name === "") { 
      showTooltip("ingredient");
      manageInputFocus(ingredientFocus);
      if (currentDescriptionRow !== null) { cleardescriptionInput(); }
      clearErrorMessage();
      return; 
    } else if (isNaN(ingredient.amount)) {
      showTooltip("amount");
      if (currentDescriptionRow !== null) { cleardescriptionInput(); }
      clearErrorMessage();
      return;
    }
    const id = currentIngredient === null ? getNewId(addedIngredients) : currentIngredient;
    const ingredientObject = {
      id: id,
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      details: ingredient.details
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
    if (currentDescriptionRow !== null) { cleardescriptionInput(); }
    manageInputFocus(ingredientFocus);
  }


  const addDescriptionRow = () => {
    clearErrorMessage();
    if (description === "") { 
      showTooltip("description");
      manageInputFocus(descriptionFocus);
      if (currentIngredient !== null) { clearIngredientsInput(); }
      return; 
    } 
    const id = currentDescriptionRow === null ? getNewId(addedDescriptionRows) : currentDescriptionRow;
    const descriptionRowObject = {
      id: id,
      description: description
    }
    let allDescriptionRows = [...addedDescriptionRows];
    if (currentDescriptionRow === null) {
      allDescriptionRows.push(descriptionRowObject);
    } else {
      let index = allDescriptionRows.findIndex(row => row.id === currentDescriptionRow);
      allDescriptionRows.splice((index), 1, descriptionRowObject); 
    }
    setAddedDescriptionRows(allDescriptionRows);
    cleardescriptionInput();
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
    clearTooltip();
    clearEditMode();
    clearErrorMessage();
  }


  const deleteDescriptionRow = (id) => {
    let allDescriptionRows = [...addedDescriptionRows];
    let index = allDescriptionRows.findIndex(row => row.id === id);
    allDescriptionRows.splice(index, 1); 
    setAddedDescriptionRows(allDescriptionRows);
    manageInputFocus(descriptionFocus);
    clearTooltip();
    clearEditMode();
    clearErrorMessage();
  }


  const toggleIngredientEditMode = (id) => {
    clearTooltip();
    clearErrorMessage();
    if (currentDescriptionRow !== null) { cleardescriptionInput(); }
    if (currentIngredient === null || currentIngredient !== id) {
      let ingredientToEdit = addedIngredients.find((item) => {
        return item.id === id;
      });
      setCurrentIngredient(ingredientToEdit.id);
      setIngredient({ 
        name: ingredientToEdit.name, 
        amount: ingredientToEdit.amount, 
        unit: ingredientToEdit.unit, 
        details: ingredientToEdit.details});
    } else {
      clearIngredientsInput();
    }
    manageInputFocus(ingredientFocus);
  }


  const toggleDescriptionEditMode = (id) => {
    clearTooltip();
    clearErrorMessage();
    if (currentIngredient !== null) { clearIngredientsInput(); } 
    if (currentDescriptionRow === null || currentDescriptionRow !== id) {
      let descriptionRowToEdit = addedDescriptionRows.find((item) => {
        return item.id === id;
      })
      setCurrentDescriptionRow(descriptionRowToEdit.id);
      setDescription(descriptionRowToEdit.description);
    } else {
      cleardescriptionInput();
    }
    manageInputFocus(descriptionFocus);
  }



  return ( 
    <React.Fragment> 
          <Modal 
            show={!!error}
            onCancel={clearError}
            header="Någonting gick fel"
            footer={<Button onClick={clearError}>OK</Button>}>
            {error}
          </Modal>

          <Modal
            show={!!postedRecipe}
            onCancel={() => setPostedRecipe("")}
            header={`${postedRecipe.mealName} är sparat!`}
            footer={<Button onClick={() => setPostedRecipe("")}>OK</Button>}
            footerClass="confirmation-modal__footer">
              {postedRecipe.creator && <Recipe ingredients={postedRecipe.ingredients} description={postedRecipe.description}/>}
          </Modal>

      <Background className="recipe-input-moderator-container">

       {isLoading && <LoadingSpinner asOverlay />}

        <div className="component-resizer">
 
          <div className="recipe-input-moderator">

            <form>

              <TitleInput titleInput={title} handleChange={handleTitleChange} titleFocus={titleFocus}/>

              <CategoryInput handleChange={handleCategoryChange} selectedCategory={category} handleEnter={handleEnter} />

              <div className="input-with-items-wrapper">

                <IngredientInput  handleChange={handleIngredientChange} 
                                  addIngredient={addIngredient}
                                  handleEnter={handleEnter} 
                                  hideTooltip={hideTooltip}
                                  name={ingredient.name} 
                                  amount={ingredient.amount} 
                                  unit={ingredient.unit} 
                                  details={ingredient.details}
                                  inputFocus={ingredientFocus}
                                  tooltipTarget={tooltipTarget}
                                  editMode={currentIngredient !== null}/>
                
                {(addedIngredients.length > 0) && <ul className="added-items-list">
                  {addedIngredients.map((item) => {
                  return <AddedRecipeItem   key={item.id} 
                                            id={item.id}
                                            content={`${item.amount} ${item.unit} ${item.name} ${item.details}`}  
                                            currentItem={currentIngredient}
                                            toggleEditMode={() => toggleIngredientEditMode(item.id)}
                                            deleteItem={() => deleteIngredient(item.id)}/>
                    })}
                </ul>}

              </div>

              <div className="input-with-items-wrapper"> 

                <DescriptionInput handleChange={handleDescriptionChange} 
                                  addDescriptionRow={addDescriptionRow} 
                                  handleEnter={handleEnter} 
                                  hideTooltip={hideTooltip}
                                  value={description}
                                  inputFocus={descriptionFocus}
                                  showTooltip={tooltipTarget === "description"}
                                  editMode={currentDescriptionRow !== null}/>
        
                {(addedDescriptionRows.length > 0) && <ul className="added-items-list">
                  {addedDescriptionRows.map((item, i) => {
                    return <AddedRecipeItem   key={item.id} 
                                              id={item.id}
                                              listItemNumber={i + 1}
                                              content={item.description}
                                              currentItem={currentDescriptionRow}
                                              toggleEditMode={() => toggleDescriptionEditMode(item.id)}
                                              deleteItem={() => deleteDescriptionRow(item.id)}/>
                      })}
                  </ul>}
              
              </div>
              {errorMessage && (
                <ErrorMessage hideError={hideError} errorClass="input-moderator__error-message">
                    {errorMessage}
                </ErrorMessage>
                )}
            </form>
          
            <Button type="button" onClick={handleSubmit}>Lägg upp recept</Button>

          </div> 

        </div> 

        <ArtistAttribute />

      </Background>
  
    </React.Fragment>
  );
}

export default RecipeInputModerator;

 
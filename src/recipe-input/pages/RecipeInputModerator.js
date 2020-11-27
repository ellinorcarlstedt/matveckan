import React, { useEffect, useCallback, useReducer, useContext } from 'react';
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import useCustomRef from "../../shared/hooks/ref-hook";
import Background from "../../shared/UIElements/Background";
import Modal from "../../shared/UIElements/Modal";
import Button from '../../shared/UIElements/Button';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import ErrorMessage from '../../shared/UIElements/ErrorMessage';
import TitleInput from "../components/TitleInput";
import CategoryInput from "../components/CategoryInput";
import IngredientInput from "../components/IngredientInput";
import DescriptionInput from "../components/DescriptionInput";
import AddedRecipeItem from "../components/AddedRecipeItem";
import Recipe from '../../menu/components/Recipe';
import ArtistAttribute from '../../shared/UIElements/ArtistAttribute'; 

  const itemsReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputName] : {
                        ...state.inputs[action.inputName],
                        value: action.value
                    }
                },
                tooltipTarget: "",
                errorMessage: ""
            }
        case "ADD_ITEM":
            let itemsList = [...state.addedItems]; 
            if (state.currentItem.id === null || state.currentItem.id !== action.newItem.id) {
                itemsList.push(action.newItem);
            } else {
                let index = itemsList.findIndex(item => item.id === state.currentItem.id);
                itemsList.splice((index), 1, action.newItem); 
            } 
            let clearedInputsAfterAdding = {};
            for (let prop in state.inputs) {
                let clearedValue = !state.inputs[prop].itemType ? state.inputs[prop].value : "";  
                clearedInputsAfterAdding = {
                    ...clearedInputsAfterAdding,
                    [prop]: {
                        ...state.inputs[prop],
                        value: clearedValue
                    }
                }
            } 
            return {
                ...state,
                inputs: clearedInputsAfterAdding,
                addedItems: itemsList,
                currentItem: { id: null, itemType: "" },
                tooltipTarget: "",
                errorMessage: ""
            }
        case "DELETE_ITEM":
            let updatedItems = state.addedItems.filter((item) => {
                return item.id !== action.id;
            }); 
            let clearedInputsAfterDeleting = {};
            for (let prop in state.inputs) {
                let clearedValue = !state.inputs[prop].itemType ? state.inputs[prop].value : "";
                clearedInputsAfterDeleting = {
                    ...clearedInputsAfterDeleting,
                    [prop]: {
                        ...state.inputs[prop],
                        value: clearedValue
                    }
                }
            }         
            return {
                ...state,
                inputs: clearedInputsAfterDeleting,
                addedItems: updatedItems, 
                currentItem: { id: null, itemType: "" },
                tooltipTarget: "",
                errorMessage: ""
            }
        case "SET_EDIT_MODE": 
            let itemToEdit = state.addedItems.filter(item => item.id === action.id);
            let editModeInputValues = {};
            for (let prop in state.inputs) {
                let itemType = state.inputs[prop].itemType;
                let updatedValue = "";
                if (!itemType) {
                    updatedValue = state.inputs[prop].value;
                } else if (itemType === itemToEdit[0].itemType) {
                    updatedValue = itemToEdit[0][prop];
                } 
                editModeInputValues = {
                    ...editModeInputValues,
                    [prop]: {
                        ...state.inputs[prop],
                        value: updatedValue
                    }
                }
            }         
            return {
                ...state,
                inputs: editModeInputValues,
                currentItem: { id: action.id, itemType: itemToEdit[0].itemType },
                tooltipTarget: "",
                errorMessage: ""
            }
        case "CLEAR_EDIT_MODE":
            let clearedInputs = {};
            for (let prop in state.inputs) {
                let clearedValue = !state.inputs[prop].itemType ? state.inputs[prop].value : "";
                clearedInputs = {
                    ...clearedInputs,
                    [prop]: {
                        ...state.inputs[prop],
                        value: clearedValue
                    }
                }
            }   
            return {
                ...state,
                inputs: clearedInputs,
                currentItem: { id: null, itemType: "" }
            }
        case "HANDLE_TOOLTIP":
            return {
                ...state,
                tooltipTarget: action.target
            }  
        case "HANDLE_ERROR_MESSAGE":
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case "HANDLE_POSTED_RECIPE":
            let cleanedInputs = {};
            for (let prop in state.inputs) {
                cleanedInputs = {
                    ...cleanedInputs,
                    [prop]: {
                        ...state.inputs[prop],
                        value: ""
                    }
                }
            }   
            return {
                inputs: cleanedInputs,
                addedItems: [],
                currentItem: { id: null, itemType: "" },
                tooltipTarget: "",
                errorMessage: "",
                postedRecipe: action.recipe
            }      
        default:
            return state;
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


const RecipeInputModerator = () => {

    const initialState = {
        inputs: {
            title: { name: "title", value: "" },
            category: { name: "category", value: "" },
            name: { name: "name", value: "", itemType: "ingredients" },
            amount: { name: "amount", value: "", itemType: "ingredients"},
            unit: { name: "unit", value: "", itemType: "ingredients" },
            details: { name: "details", value: "", itemType: "ingredients" },
            description: { name: "description", value: "", itemType: "description" }
        },
        addedItems: [],
        currentItem: { id: null, itemType: "" },
        tooltipTarget: "",
        errorMessage: "",
        postedRecipe: ""
    }

    const [state, dispatch] = useReducer(itemsReducer, initialState);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const titleFocus = useCustomRef();
    const ingredientFocus = useCustomRef();
    const amountFocus = useCustomRef();
    const descriptionFocus = useCustomRef();

    useEffect(() => {
        if (titleFocus) {
          titleFocus.current.focus();
        }
      }, [titleFocus]);


    const handleChange = useCallback((name, value) => {
        dispatch({
            type: "INPUT_CHANGE",
            inputName: name,
            value: value
        }); 
    }, []);


    const validateItemInput = useCallback((itemType) => {
        let tooltipTarget; 
        if (itemType === "ingredients") {
            if (state.inputs.name.value === "") {
                tooltipTarget = "ingredient";
                ingredientFocus.current.focus();
            } else if (isNaN(state.inputs.amount.value)) {
                tooltipTarget = "amount";
                amountFocus.current.focus();
            }
        } else if (itemType === "description" && state.inputs.description.value === "") {
            tooltipTarget = "description";
            descriptionFocus.current.focus();
        }  
        if (!!tooltipTarget) {
            dispatch({
                type: "HANDLE_TOOLTIP",
                target: tooltipTarget
            });
            return false;
        } else {
            return true;
        }
    }, [state.inputs.name.value, state.inputs.amount.value, state.inputs.description.value, 
        ingredientFocus, amountFocus, descriptionFocus]);


    const addItem = useCallback((itemType) => {
        let isInputValid = validateItemInput(itemType);
        if (!isInputValid) { return; }
        let id;
        if (state.currentItem.id === null || state.currentItem.itemType !== itemType) {
            id = getNewId(state.addedItems);
        } else {
            id = state.currentItem.id;
        }
        let newItem;
        for (let prop in state.inputs) {
            if (state.inputs[prop].itemType === itemType) {
                newItem = {
                    ...newItem,
                    [prop]: state.inputs[prop].value
                }
            }
        }
        dispatch({
            type: "ADD_ITEM",
            itemType: itemType,
            newItem: { id, itemType, ...newItem } 
        }); 
        if (itemType === "ingredients") {
            ingredientFocus.current.focus();
        }
    }, [state, validateItemInput, ingredientFocus]);


    const toggleEditMode = useCallback((id) => {
        if (state.currentItem.id === null || state.currentItem.id !== id) {
            dispatch({
                type: "SET_EDIT_MODE",
                id: id
            }); 
        } else {
            dispatch({
                type: "CLEAR_EDIT_MODE",
            }); 
        }
    }, [state.currentItem.id]);


    const handleEnter = (e) => {
        let itemType = e.target.attributes.itemType.value;
        if (e.key === "Enter") {
            if (itemType === "ingredients" || itemType === "description") {
                addItem(itemType);
            } 
        }
    }


    const validateFormInput = () => {
        let errorMessage;
        if (!state.inputs.title.value) {
            errorMessage = "Du behöver ange maträttens namn.";
            titleFocus.current.focus();
        } else if (!state.inputs.category.value) {
            errorMessage = "Du behöver ange en kategori för receptet - klicka på en av symbolerna.";
        } else {
            let addedIngredients = state.addedItems.filter((item) =>  item.itemType === "ingredients");
            let addedDescriptions = state.addedItems.filter((item) =>  item.itemType === "description");
            if (!addedIngredients.length) {
                errorMessage = "Lägg till minst en ingrediens.";
                ingredientFocus.current.focus();
            } else if (!addedDescriptions.length) {
                errorMessage = "Lägg till minst en beskrivningspunkt.";
                descriptionFocus.current.focus();
            }
        }
        if (!!errorMessage) {
            dispatch({
                type: "HANDLE_ERROR_MESSAGE",
                errorMessage: errorMessage
            });
            return false;
        } else {
            return true;
        }
    }


    const handleSubmit = async event => {
        event.preventDefault();
        let validInput = false;
        validInput = validateFormInput();
        if (!validInput) { 
           return; 
        } else {
            let ingredients = state.addedItems.filter((item) => {
                return item.itemType === "ingredients" }).map((item) => {
                return {
                    name: item.name,
                    amount: item.amount,
                    unit: item.unit,
                    details: item.details
                }
            });
            let descriptions = state.addedItems.filter((item) =>  {
                return item.itemType === "description" }).map((item) => {
                return {
                    description: item.description
                }    
            });
            try {
              const response = await sendRequest(
                "http://localhost:5000/api/recipes",
                "POST",
                JSON.stringify({
                  mealName: state.inputs.title.value,
                  mealCategory: state.inputs.category.value,
                  ingredients: ingredients,
                  description: descriptions,
                  creator: auth.userId
                }),
                { 
                  "Content-Type" : "application/json"
                }
                );
                dispatch({ type: "HANDLE_POSTED_RECIPE", recipe: response.recipe })
            } catch (err) {}
        }
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
            show={!!state.postedRecipe}
            onCancel={() => dispatch({ type: "HANDLE_POSTED_RECIPE", recipe: "" })}
            header={`${state.postedRecipe.mealName} är sparat!`}
            footer={<Button onClick={() => dispatch({ type: "HANDLE_POSTED_RECIPE", recipe: "" })}>OK</Button>}
            footerClass="confirmation-modal__footer">
            {state.postedRecipe && <Recipe 
                ingredients={state.postedRecipe.ingredients} 
                description={state.postedRecipe.description}/>}
        </Modal>

        <Background className="recipe-input-moderator-container">

        {isLoading && <LoadingSpinner asOverlay />}
 
          <div className="recipe-input-moderator">

            <form>
            
                <TitleInput 
                    titleInput={state.inputs.title.value} 
                    handleChange={(e) => handleChange(e.target.name, e.target.value)} 
                    inputFocus={titleFocus}/>

                <CategoryInput 
                    handleChange={handleChange} 
                    selectedCategory={state.inputs.category.value}/>
                
                <div className="input-with-items-wrapper">

                    <IngredientInput  
                        handleChange={(e) => handleChange(e.target.name, e.target.value)} 
                        addIngredient={() => addItem("ingredients")}
                        name={state.inputs.name.value} 
                        amount={state.inputs.amount.value} 
                        unit={state.inputs.unit.value} 
                        details={state.inputs.details.value}
                        handleEnter={handleEnter} 
                        hideTooltip={() => dispatch({ type: "HANDLE_TOOLTIP", target: "" })}
                        ingredientFocus={ingredientFocus}
                        amountFocus={amountFocus}
                        tooltipTarget={state.tooltipTarget} />

                    <ul className="added-items-list">
                    {state.addedItems.filter((item) => item.itemType === "ingredients").map((item) => {
                        let itemName;
                        if (item.amount || item.unit) {
                            itemName = item.name.toLowerCase();
                        } else {
                            itemName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
                        }
                        return  <AddedRecipeItem   
                                    key={item.id} 
                                    id={item.id}
                                    content={`${item.amount} ${item.unit} ${itemName} ${item.details}`} 
                                    deleteItem={() => dispatch({ type: "DELETE_ITEM", id: item.id })} 
                                    toggleEditMode={() => toggleEditMode(item.id)}
                                    currentItem={state.currentItem.id}
                                    />
                                })
                        }
                    </ul>

                </div>

                <div className="input-with-items-wrapper">
                    <DescriptionInput  
                        handleChange={(e) => handleChange(e.target.name, e.target.value)} 
                        addDescription={() => addItem("description")}
                        value={state.inputs.description.value} 
                        handleEnter={handleEnter} 
                        hideTooltip={() => dispatch({ type: "HANDLE_TOOLTIP", target: "" })}
                        inputFocus={descriptionFocus}
                        showTooltip={state.tooltipTarget === "description"}/>
                
                    <ul className="added-items-list">
                        {state.addedItems.filter((item) => item.itemType === "description").map((item, i) => {
                        return <AddedRecipeItem   
                                    key={item.id} 
                                    id={item.id}
                                    listItemNumber={i + 1}
                                    content={item.description}  
                                    deleteItem={() => dispatch({ type: "DELETE_ITEM", id: item.id })} 
                                    toggleEditMode={() => toggleEditMode(item.id)}
                                    currentItem={state.currentItem.id}/>
                            })}
                    </ul>

                </div>

               {state.errorMessage && (
               <ErrorMessage hideError={() => dispatch({ type: "HANDLE_ERROR_MESSAGE", message: "" })} errorClass="input-moderator__error-message">
                   {state.errorMessage}
               </ErrorMessage>
               )}
            
            </form>
          
            <Button type="button" onClick={handleSubmit}>Lägg upp recept</Button>

          </div> 

        <ArtistAttribute />

      </Background>
  
    </React.Fragment>
  );
}

export default RecipeInputModerator;





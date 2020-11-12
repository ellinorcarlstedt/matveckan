import React, { useCallback, useReducer } from 'react';
import TitleInput from "./TitleInput";
import CategoryInput from "./CategoryInput";
import IngredientInput from "./IngredientInput";
import DescriptionInput from "./DescriptionInput";
import AddedRecipeItem from "./AddedRecipeItem";

const getNewId = (list) => {
    let highestIdInList = 0; 
    for (let i=0; i < list.length; i++) {
      if (list[i].id > highestIdInList) {
        highestIdInList = list[i].id;
      }
    }
    return highestIdInList + 1;
  } 

  const itemsReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            return {
                ...state,
                tooltipTarget: "",
                inputs: {
                    ...state.inputs,
                    [action.inputName] : {
                        ...state.inputs[action.inputName],
                        value: action.value
                    }
                }
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
                inputs: clearedInputsAfterAdding,
                addedItems: itemsList,
                currentItem: { id: null, itemType: "" },
                tooltipTarget: "",
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
                inputs: clearedInputsAfterDeleting,
                addedItems: updatedItems, 
                currentItem: { id: null, itemType: "" }
            }
        case "SET_EDIT_MODE": 
            let itemToEdit = state.addedItems.filter(item => item.id === action.id);
            let editModeInputs = {};
            for (let prop in state.inputs) {
                let itemType = state.inputs[prop].itemType;
                let updatedValue = "";
                if (!itemType) {
                    updatedValue = state.inputs[prop].value;
                } else if (itemType === itemToEdit[0].itemType) {
                    updatedValue = itemToEdit[0][prop];
                } 
                editModeInputs = {
                    ...editModeInputs,
                    [prop]: {
                        ...state.inputs[prop],
                        value: updatedValue
                    }
                }
            }         
            return {
                ...state,
                inputs: editModeInputs,
                currentItem: { id: action.id, itemType: itemToEdit[0].itemType },
                tooltipTarget: "",
            }
        case "CLEAR_ITEM_INPUTS":
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
        case "SHOW_TOOLTIP":
            return {
                ...state,
                tooltipTarget: action.target
            }      
        default:
            return state;
    }
}


const TEST_COMP = () => {

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
    
        const handleChange = useCallback((name, value) => {
            dispatch({
                type: "INPUT_CHANGE",
                inputName: name,
                value: value
            }); 
        }, []);

        const addItem = useCallback((itemType) => {
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
        }, [state]);
    

        const deleteItem = useCallback((id) => {
            dispatch({
                type: "DELETE_ITEM",
                id: id
            }); 
        }, []);
    

        const toggleEditMode = useCallback((id) => {
            if (state.currentItem.id === null || state.currentItem.id !== id) {
                dispatch({
                    type: "SET_EDIT_MODE",
                    id: id
                }); 
            } else {
                dispatch({
                    type: "CLEAR_ITEM_INPUTS",
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

    console.log("state at rendering");
    console.log(state);

    return (
        <div style={{ marginTop: "10rem", padding: "1rem", backgroundColor: "white"}}>
            
            <h2>Test comp 2 - working!</h2>

            <TitleInput 
                titleInput={state.inputs.title.value} 
                handleChange={(e) => handleChange(e.target.name, e.target.value)} 
            //    titleFocus={titleFocus}
            />

            <CategoryInput 
                handleChange={handleChange} 
                selectedCategory={state.inputs.category.value} 
           //     handleEnter={handleEnter} 
           />
            
            <div className="input-with-items-wrapper">

                <IngredientInput  
                    handleChange={(e) => handleChange(e.target.name, e.target.value)} 
                    addIngredient={() => addItem("ingredients")}
                    name={state.inputs.name.value} 
                    amount={state.inputs.amount.value} 
                    unit={state.inputs.unit.value} 
                    details={state.inputs.details.value}
                    handleEnter={handleEnter} 
              //      hideTooltip={hideTooltip}
             //       inputFocus={ingredientFocus}
             //       tooltipTarget={tooltipTarget}
                    editMode={state.currentItem.id !== null}/>

                <ul className="added-items-list">
                {state.addedItems.filter((item) => item.itemType === "ingredients").map((item) => {
                    return  <AddedRecipeItem   
                                key={item.id} 
                                id={item.id}
                                content={`${item.amount} ${item.unit} ${item.name} ${item.details}`} 
                                deleteItem={() => deleteItem(item.id)} 
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
                    addDescriptionRow={() => addItem("description")}
                    value={state.inputs.description.value} 
                    handleEnter={handleEnter} 
            //        hideTooltip={hideTooltip}
            //        inputFocus={ingredientFocus}
            //        tooltipTarget={tooltipTarget}
                    editMode={state.currentItem.id !== null}
                />
            

                <ul className="added-items-list">
                {state.addedItems.filter((item) => item.itemType === "description").map((item, i) => {
                    return <AddedRecipeItem   
                                key={item.id} 
                                id={item.id}
                                listItemNumber={i + 1}
                                content={item.description}  
                                deleteItem={() => deleteItem(item.id)}
                                toggleEditMode={() => toggleEditMode(item.id)}
                                currentItem={state.currentItem.id}/>
                        })}
                </ul>
            </div>
        </div>
    )
}

export default TEST_COMP;





import React, { useCallback, useReducer } from 'react';
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
                inputs: {
                    ...state.inputs,
                    [action.inputId] : {
                        ...state.inputs[action.inputId],
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
            let clearedInputsAfterAdd = {};
            for (let prop in state.inputs) {
                let clearedValue = "";
                clearedInputsAfterAdd = {
                    ...clearedInputsAfterAdd,
                    [prop]: {
                        ...state.inputs[prop],
                        value: clearedValue
                    }
                }
            } 
            return {
                inputs: clearedInputsAfterAdd,
                addedItems: itemsList,
                currentItem: { id: null, itemType: "" }
            }
        case "DELETE_ITEM":
            let updatedItems = state.addedItems.filter((item) => {
                return item.id !== action.id;
            }); 
            let clearedInputsAfterDelete = {};
            for (let prop in state.inputs) {
                let clearedValue = "";
                if (state.inputs[prop].itemType !== action.itemType && state.currentItem.id === null) {
                    clearedValue = state.inputs[prop].value
                }
                clearedInputsAfterDelete = {
                    ...clearedInputsAfterDelete,
                    [prop]: {
                        ...state.inputs[prop],
                        value: clearedValue
                    }
                }
            }         
            return {
                inputs: clearedInputsAfterDelete,
                addedItems: updatedItems, 
                currentItem: { id: null, itemType: "" }
            }
        case "SET_EDIT_MODE": 
            let itemToEdit = state.addedItems.filter(item => item.id === action.id);
            let editModeInputs = {};
            for (let prop in state.inputs) {
                let updatedValue = state.inputs[prop].itemType === itemToEdit[0].itemType ? itemToEdit[0][prop] : "";
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
                currentItem: { id: action.id, itemType: itemToEdit[0].itemType }
            }
        case "CLEAR_INPUTS":
            let clearedInputs = {};
            for (let prop in state.inputs) {
                clearedInputs = {
                    ...clearedInputs,
                    [prop]: {
                        ...state.inputs[prop],
                        value: ""
                    }
                }
            }   
            return {
                ...state,
                inputs: clearedInputs,
                currentItem: { id: null, itemType: "" }
            }      
        default:
            return state;
    }
}


const TEST_COMP = () => {
    
        const [itemsState, dispatch] = useReducer(itemsReducer, {
            inputs: {
                name: { name: "name", itemType: "ingredients", value: "" },
                amount: { name: "amount", itemType: "ingredients", value: ""},
                unit: { name: "unit", itemType: "ingredients", value: "" },
                details: { name: "details", itemType: "ingredients", value: "" },
                description: { name: "description", itemType: "description", value: "" }
            },
            addedItems: [],
            currentItem: { id: null, itemType: "" }
        });
    
        const handleChange = useCallback((id, value) => {
            dispatch({
                type: "INPUT_CHANGE",
                inputId: id,
                value: value
            }); 
        }, []);

        const addItem = useCallback((itemType) => {
            let id;
            if (itemsState.currentItem.id === null || itemsState.currentItem.itemType !== itemType) {
                id = getNewId(itemsState.addedItems);
            } else {
                id = itemsState.currentItem.id;
            }
            let newItem;
            for (let input in itemsState.inputs) {
                if (itemsState.inputs[input].itemType === itemType) {
                    newItem = {
                        ...newItem,
                        [input]: itemsState.inputs[input].value
                    }
                }
            }
            dispatch({
                type: "ADD_ITEM",
                itemType: itemType,
                newItem: { id, itemType, ...newItem } 
            }); 
        }, [itemsState]);
    

        const deleteItem = useCallback((id) => {
            dispatch({
                type: "DELETE_ITEM",
                id: id
            }); 
        }, []);
    

        const toggleEditMode = useCallback((id) => {
            if (itemsState.currentItem.id === null || itemsState.currentItem.id !== id) {
                dispatch({
                    type: "SET_EDIT_MODE",
                    id: id
                }); 
            } else {
                dispatch({
                    type: "CLEAR_INPUTS",
                }); 
            }
        }, [itemsState.currentItem.id]);
    

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            addItem(e.target.attributes.itemType.value);
      }
    }

    console.log("state at rendering");
    console.log(itemsState);

    return (
        <div style={{ marginTop: "10rem", padding: "1rem", backgroundColor: "white"}}>
            
            <h2>Test comp 2 - working!</h2>
            
            <div className="input-with-items-wrapper">

                <IngredientInput  
                    handleChange={(e) => handleChange(e.target.name, e.target.value)} 
                    addIngredient={() => addItem("ingredients")}
                    name={itemsState.inputs.name.value} 
                    amount={itemsState.inputs.amount.value} 
                    unit={itemsState.inputs.unit.value} 
                    details={itemsState.inputs.details.value}
                    handleEnter={handleEnter} 
              //      hideTooltip={hideTooltip}
             //       inputFocus={ingredientFocus}
             //       tooltipTarget={tooltipTarget}
                    editMode={itemsState.currentItem.id !== null}/>

                <ul className="added-items-list">
                {itemsState.addedItems.filter((item) => item.itemType === "ingredients").map((item) => {
                    return  <AddedRecipeItem   
                                key={item.id} 
                                id={item.id}
                                content={`${item.amount} ${item.unit} ${item.name} ${item.details}`} 
                                deleteItem={() => deleteItem(item.id)} 
                                toggleEditMode={() => toggleEditMode(item.id)}
                                currentItem={itemsState.currentItem.id}
                                />
                        })
                    }
                </ul>
            </div>
            <div className="input-with-items-wrapper">
             <DescriptionInput  
                    handleChange={(e) => handleChange(e.target.name, e.target.value)} 
                    addDescriptionRow={() => addItem("description")}
                    value={itemsState.inputs.description.value} 
                    handleEnter={handleEnter} 
            //        hideTooltip={hideTooltip}
            //        inputFocus={ingredientFocus}
            //        tooltipTarget={tooltipTarget}
                    editMode={itemsState.currentItem.id !== null}
                />
            

                <ul className="added-items-list">
                {itemsState.addedItems.filter((item) => item.itemType === "description").map((item, i) => {
                    return <AddedRecipeItem   
                                key={item.id} 
                                id={item.id}
                                listItemNumber={i + 1}
                                content={item.description}  
                                deleteItem={() => deleteItem(item.id)}
                                toggleEditMode={() => toggleEditMode(item.id)}
                                currentItem={itemsState.currentItem.id}/>
                        })}
                </ul>
            </div>
        </div>
    )
}

export default TEST_COMP;





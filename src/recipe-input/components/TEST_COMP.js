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

const TEST_COMP = () => {

    console.log("TEST_COMP rendered");

    const itemsReducer = (state, action) => {
        let type = action.itemType;
        switch (action.type) {
            case "INPUT_CHANGE":
            return {
                ...state,
                [type]: {
                    ...state[type],
                    inputs: {
                        ...state[type].inputs,
                        [action.inputId] : action.value
                    }
                }
            }
            case "ADD_ITEM":
                let itemsList = [...state[type].addedItems];
                if (state[type].currentItem === null) {
                    itemsList.push(action.item);
                } else {
                    let index = itemsList.findIndex(item => item.id === state[type].currentItem);
                    itemsList.splice((index), 1, action.item); 
                }
                console.log("state before cleared inputs");
                console.log(state[type]);
                let clearedInputs = {...state[type].inputs};
                for (let input in clearedInputs) {
                    clearedInputs[input] = "";
                }
                console.log("state after cleared inputs");
                console.log(state[type]);
            return {
                ...state,
                [type]: {
                    addedItems: itemsList,
                    inputs: clearedInputs,
                    currentItem: null
                }
            }
            case "DELETE_ITEM":
                let addedItemsList = [...state[type].addedItems];
                const updatedItems = addedItemsList.filter((item) => {
                    return item.id !== action.id;
                });
                let clearedInput = {...state[type].inputs};
                for (let input in clearedInput) {
                    clearedInput[input] = "";
                }
            return {
                ...state,
                [type]: {
                    ...state[type],
                    inputs: clearedInput,
                    addedItems: updatedItems,
                    currentItem: null
                }
                
            }
            case "TOGGLE_EDIT_MODE":
                if (state[type].currentItem === null || state[type].currentItem !== action.id) {
                    let itemToEdit = state[type].addedItems.find((item) => {
                        return item.id === action.id;
                    });
                    return {
                        ...state,
                        [type]: {
                            ...state[type],
                            inputs: itemToEdit,
                            currentItem: action.id
                        }
                    }
                } else {
                    let clearedInputs = {...state[type].inputs};
                    for (let input in clearedInputs) {
                        clearedInputs[input] = "";
                    }
                return {
                    ...state,
                    [type]: {
                        ...state[type],
                        inputs: clearedInputs,
                        currentItem: null
                    }
                }
            }
            default:
                return state;
        }
    }
    
        const [itemsState, dispatch] = useReducer(itemsReducer, {
            ingredients: {
                inputs: {
                    name: "",
                    amount: "",
                    unit: "",
                    details: ""
                },
                addedItems: [],
                currentItem: null
            },
            description: {
                inputs: {
                    description: ""
                },
                addedItems: [],
                currentItem: null
            }
        });
    
        const handleChange = useCallback((itemType, id, value) => {
            dispatch({
                type: "INPUT_CHANGE",
                itemType: itemType,
                inputId: id,
                value: value
            }); 
        }, []);
    

        const addItem = useCallback((itemType) => {
            const id = itemsState[itemType].currentItem === null ? getNewId(itemsState[itemType].addedItems) : itemsState[itemType].currentItem;
            const newItem = {
                ...itemsState[itemType].inputs,
                id: id
            }
            dispatch({
                type: "ADD_ITEM",
                itemType: itemType,
                item: newItem
            }); 
        }, [itemsState]);
    

        const deleteItem = useCallback((itemType, id) => {
            dispatch({
                type: "DELETE_ITEM",
                itemType: itemType,
                id: id
            }); 
        }, []);
    

        const toggleEditMode = useCallback((itemType, id) => {
            dispatch({
                type: "TOGGLE_EDIT_MODE",
                itemType: itemType,
                id: id
            }); 
        }, []);
    

    const handleEnter = (e) => {
        if (e.key === "Enter") {
        let source = e.target.name;
        if (source === "name" || source === "unit" || source === "amount" || source === "details") {
            addItem("ingredients");
        } else if (source === "description") {
            addItem("description");
        }
      }
    }


    return (
        <div style={{ marginTop: "10rem", padding: "1rem", backgroundColor: "white"}}>
            <h2>Test comp 1</h2>
            <div className="input-with-items-wrapper">
                <IngredientInput  
                    handleChange={(e) => handleChange("ingredients", e.target.name, e.target.value)} 
                    addIngredient={() => addItem("ingredients")}
                    name={itemsState.ingredients.inputs.name} 
                    amount={itemsState.ingredients.inputs.amount} 
                    unit={itemsState.ingredients.inputs.unit} 
                    details={itemsState.ingredients.inputs.details}
                    handleEnter={handleEnter} 
              //      hideTooltip={hideTooltip}
             //       inputFocus={ingredientFocus}
             //       tooltipTarget={tooltipTarget}
                    editMode={itemsState.ingredients.currentItem !== null}
                />

                <ul className="added-items-list">
                {itemsState.ingredients.addedItems.map((item) => {
                return <AddedRecipeItem   
                            key={item.id} 
                            id={item.id}
                            content={`${item.amount} ${item.unit} ${item.name} ${item.details}`} 
                            deleteItem={() => deleteItem("ingredients", item.id)} 
                            currentItem={itemsState.ingredients.currentItem}
                            toggleEditMode={() => toggleEditMode("ingredients", item.id)}
                            />
                    })}
                </ul>
            </div>
            <div className="input-with-items-wrapper">
                <DescriptionInput  
                    handleChange={(e) => handleChange("description", e.target.name, e.target.value)} 
                    addDescriptionRow={() => addItem("description")}
                    value={itemsState.description.inputs.description} 
                    handleEnter={handleEnter} 
              //      hideTooltip={hideTooltip}
              //      inputFocus={ingredientFocus}
              //      tooltipTarget={tooltipTarget}
                    editMode={itemsState.currentItem !== null}
                />

                <ul className="added-items-list">
                {itemsState.description.addedItems.map((item, i) => {
                return <AddedRecipeItem   
                            key={item.id} 
                            id={item.id}
                            listItemNumber={i + 1}
                            content={item.description}  
                            currentItem={itemsState.description.currentItem}
                            toggleEditMode={() => toggleEditMode("description", item.id)}
                            deleteItem={() => deleteItem("description", item.id)}/>
                    })}
                </ul>
            </div>
             
        </div>
    )
}

export default TEST_COMP;

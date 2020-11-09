import { useCallback, useReducer } from 'react';

const itemsReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
        return {
            ...state,
            [action.itemType]: {
                inputs: {
                    ...action.itemType.inputs,
                    [action.inputId] : action.value
                }
            }
        }
        case "ADD_ITEM":
            let itemsList = [...state.addedItems];
            if (state.currentItem === null) {
                itemsList.push(action.item);
            } else {
                let index = itemsList.findIndex(item => item.id === state.currentItem);
                itemsList.splice((index), 1, action.item); 
            }
            let clearedInputs = {...state.inputs};
            for (let input in clearedInputs) {
                clearedInputs[input] = "";
            }
        return {
            addedItems: itemsList,
            inputs: clearedInputs,
            currentItem: null
        }
        case "DELETE_ITEM":
            let addedItems = [...state.addedItems];
            const updatedItems = addedItems.filter((item) => {
                return item.id !== action.id;
            });
        return {
            ...state,
            addedItems: updatedItems
        }
        case "TOGGLE_EDIT_MODE":
            if (state.currentItem === null || state.currentItem !== action.id) {
                let itemToEdit = state.addedItems.find((item) => {
                    return item.id === action.id;
                });
                return {
                    ...state,
                    inputs: itemToEdit,
                    currentItem: action.id
                }
            } else {
                let clearedInputs = {...state.inputs};
                for (let input in clearedInputs) {
                    clearedInputs[input] = "";
                }
            return {
                ...state,
                inputs: clearedInputs,
                currentItem: null
            }
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

const useRecipeItemsHandler = () => {   
    const [itemsState, dispatch] = useReducer(itemsReducer, {
        ingredients: {
            inputs: {
                name: "Name",
                amount: "Amount",
                unit: "Unit",
                details: "Details"
            },
            addedItems: [],
            currentItem: null
        },
        descriptions: {
            inputs: {
                description: "Hej"
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

    const addItem = useCallback(() => {
        const id = itemsState.currentItem === null ? getNewId(itemsState.addedItems) : itemsState.currentItem;
        const newItem = {
            ...itemsState.inputs,
            id: id
        }
        dispatch({
            type: "ADD_ITEM",
            item: newItem
        }); 
    }, [itemsState.addedItems, itemsState.currentItem, itemsState.inputs]);

    const deleteItem = useCallback((id) => {
        dispatch({
            type: "DELETE_ITEM",
            id: id
        }); 
    }, []);

    const toggleEditMode = useCallback((id) => {
        dispatch({
            type: "TOGGLE_EDIT_MODE",
            id: id
        }); 
    }, []);


    return { itemsState, handleChange, addItem, deleteItem, toggleEditMode }
};





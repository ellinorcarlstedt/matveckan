import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

const EditRecipe = () => {

    const [ title, setTitle ] = useState();
    const [ category, setCategory ] = useState();
    const [ addedItems, setAddedItems ] = useState([]);
    const { sendRequest } = useHttpClient();
    const recipeToEdit = useParams().rid;

    useEffect(() => {
        if(!!recipeToEdit) {
            try {
                const getRecipeToEdit = async () => {
                    const response = await sendRequest(`http://localhost:5000/api/recipes/${recipeToEdit}`);
                    const ingredients = response.recipe.ingredients.map((ing) => {
                        return {
                            itemType: "ingredients",
                            name: ing.name,
                            amount: ing.amount,
                            unit: ing.unit,
                            details: ing.details
                        }
                    });
                    const descriptions = response.recipe.description.map((desc) => {
                        return {
                            itemType: "description",
                            description: desc.description
                        }
                    });
                    const allItems = ingredients.concat(descriptions).map((item, index) => {
                        return {
                            ...item,
                            id: index + 1
                        };
                    });
                    setTitle(response.recipe.mealName);
                    setCategory(response.recipe.mealCategory);
                    setAddedItems(allItems);
                }
                getRecipeToEdit();
            } catch (err) {
                console.log(err);
            }
        }

    }, [sendRequest, recipeToEdit]);

    console.log("fetchedRecipe:");
    console.log(`${title}, ${category}`);
    console.log(addedItems);

    return (
        <div>
            Test recept!
        </div>
    )
}

export default EditRecipe;

import React, { useState, useEffect, useContext } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import RecipesList from './RecipesList';
import Background from '../../shared/UIElements/Background';
import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import ArtistAttribute from '../../shared/UIElements/ArtistAttribute';

const MyRecipes = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedRecipes, setLoadedRecipes ] = useState();
    const [ deletedRecipe, setDeletedRecipe ] = useState("");
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/recipes/user/${auth.userId}`);
                setLoadedRecipes(response.recipes);
            } catch (err) {}
        }
        fetchRecipes();
    }, [sendRequest, auth.userId]);


    const deleteRecipe = async (id) => {
        try {
            const response = await sendRequest(`http://localhost:5000/api/recipes/${id}`, 
                "DELETE",
                null,
                {
                    "Authorization": "Bearer " + auth.token
                }
            );
            setDeletedRecipe(response.deleted);
            let filteredRecipes = loadedRecipes.filter((recipe) => {
                return recipe.id !== id;
            })
            setLoadedRecipes(filteredRecipes);
        } catch(err) {}
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
                show={!!deletedRecipe}
                onCancel={() => setDeletedRecipe("")}
                header="Recept borttaget"
                footer={<Button onClick={() => setDeletedRecipe("")}>OK</Button>}>
                {deletedRecipe.mealName} har tagits bort.
            </Modal>
            <Background className="my-recipes">
                {isLoading && <LoadingSpinner asOverlay />} 
                {loadedRecipes && <RecipesList recipes={loadedRecipes} deleteRecipe={deleteRecipe}/>}
                <ArtistAttribute />
            </Background>
        </React.Fragment>
    )
}

export default MyRecipes;

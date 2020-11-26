import React, { useState }  from 'react';
import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import MealOverview from './MealOverview';
import Recipe from './Recipe';
import HeightTransitionComponent from '../../shared/UIElements/HeightTransitionComponent';

function MealDisplayer(props) {

    const [ confirmModalOpen, setConfirmModalOpen ] = useState(false);

    let isOpen = props.indexOfOpenRecipe === props.meal.id ? true : false;

    const toggleRecipe = () => {
        isOpen ? props.closeRecipe() : props.openRecipe();
    }

    const toggleConfirmModal = () => {
        setConfirmModalOpen(!confirmModalOpen);
    }

    const deleteRecipe = () => {
        toggleConfirmModal();
        props.deleteRecipe();
    }
    
        return (
            <React.Fragment>
                <Modal
                    show={confirmModalOpen}
                    onCancel={toggleConfirmModal}
                    header="Är du säker?"
                    footer={<React.Fragment>
                                <Button onClick={toggleConfirmModal} buttonClass="delete-recipe-cancel-button">Avbryt</Button>
                                <Button onClick={deleteRecipe}>Radera</Button>
                            </React.Fragment>}
                    footerClass="delete-recipe-buttons"
                    >
                        Är du säker på att du vill radera {props.meal.mealName}?
                </Modal>
                <div className="meal-displayer">
                    <MealOverview 
                        source={props.source}
                        toggleRecipe={toggleRecipe}
                        title={props.meal.mealName}
                        category={props.meal.mealCategory}
                        weekday={props.weekday}
                        toggleConfirmModal={toggleConfirmModal}
                        />
                    <div onClick={toggleRecipe}>
                        <HeightTransitionComponent isOpen={isOpen} id={props.meal.id} className="border-radius">
                            <Recipe description={props.meal.description} ingredients={props.meal.ingredients}/> 
                        </HeightTransitionComponent>
                    </div>
                </div>
            </React.Fragment>
        )
}

export default MealDisplayer;

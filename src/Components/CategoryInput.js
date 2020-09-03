import React from 'react';

function CategoryInput(props) {
    return (
        <div className="category-input" onChange={props.handleChange}>         
          <label htmlFor="Nöt"><p>Nötkött</p>
            <input type="radio" id="Nöt" name="category" value="1" />
          </label> 
          <label htmlFor="Fläsk"><p>Fläsk</p>
            <input type="radio" id="Fläsk" name="category" value="5" />
          </label> 
          <label htmlFor="Fågel"><p>Fågel</p>
            <input type="radio" id="Fågel" name="category" value="2" />
          </label> 
          <label htmlFor="Fisk"><p>Fisk</p>
            <input type="radio" id="Fisk" name="category" value="3" />
          </label> 
          <label htmlFor="Vegetariskt"><p>Vegetariskt</p>
            <input type="radio" id="Vegetariskt" name="category" value="4" />
          </label> 
        </div>
    )
}

export default CategoryInput

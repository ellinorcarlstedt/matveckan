import React from 'react';
import CategoryInputIcon from './CategoryInputIcon';
import iconList from '../icons/icon-list';

function CategoryInput(props) {

  const categoryOptions = iconList.map((item) => {
    return <CategoryInputIcon imgSrc={item.imgSrc} 
                              name={item.name} 
                              value={item.value} 
                              key={item.value} 
                              handleChange={props.handleChange}
                              selectedCategory={props.selectedCategory}/>
  })

    return (
        <div className="category-input">  
            {categoryOptions}
        </div>
    )
}

export default CategoryInput;


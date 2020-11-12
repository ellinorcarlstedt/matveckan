import React from 'react';

function TitleInput(props) {
    return (
        <div className="title-input">
          <label>
            <input type="text" 
                  name="title" placeholder="Vad heter maträtten?" value={props.titleInput} autoComplete="off" onChange={props.handleChange} ref={props.inputFocus}/>
          </label> 
        </div> 
    )
}

export default TitleInput;

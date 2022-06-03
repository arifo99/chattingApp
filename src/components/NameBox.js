import React, { useRef, useState } from 'react';

function NameBox(props) {
    const nameRef = useRef();

    const [errorMessage, setErrorMessage] = useState("");
    
    function handleEnterClicked(event) {
        if(nameRef.current.value.length == 0)
            setErrorMessage("Name can't be empty!");
        
        props.setName(nameRef.current.value);
    }

    function handleKeyPressed(event) {
        if(event.key == 'Enter') {
            handleEnterClicked({});
        }
    }
    
    return (
        <div>
            <h2>Enter your name: </h2>
            <input type="text" ref={nameRef} onKeyPress={handleKeyPressed}/>
            <button onClick={handleEnterClicked}>Enter</button>
            <div>
                {errorMessage}
            </div>
        </div>
    )
}

export default NameBox;
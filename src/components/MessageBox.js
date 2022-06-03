import React, { useRef } from 'react';

function MessageBox(props) {
    const messageRef = useRef();

    function handleEnterClicked(event) {
        console.log(props);
        props.socketManager.emit('new_message', props.name, props.activeContact, messageRef.current.value);
        props.setMessages(prevState => {
            var newState = JSON.parse(JSON.stringify(prevState));
            if(newState[props.activeContact] == null)
                newState[props.activeContact] = [];
            newState[props.activeContact].push({"text": messageRef.current.value, "sent": true});
            return newState;
        })
    }

    function handleKeyPressed(event) {
        if(event.key == 'Enter')
            handleEnterClicked({});
    }
    
    return(
        <div>
            {console.log(props.messages[props.activeContact])}
            {props.messages[props.activeContact] == null? null: props.messages[props.activeContact].map(message => 
                <div>
                    {message.sent? "You: ": props.activeContact+":"}
                    {message.text}
                </div>
            )}

            <div>
                <input type="text" ref={messageRef} onKeyPress={handleKeyPressed}/>
                <button onClick={handleEnterClicked}>Send</button>
            </div>
        </div>
    )
}

export default MessageBox;
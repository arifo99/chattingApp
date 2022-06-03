import React, { useRef, useState } from 'react';
import ContactsList from './ContactsList';
import MessageBox from './MessageBox';

function ChatBox(props) {
    const newContactNameRef = useRef();

    const [addingContact, setAddingContact] = useState(false);
    const [activeContact, setActiveContact] = useState("");

    function clearActiveContact(event) {
        setActiveContact("");
    }

    function setAddContactClicked(event) {
        setAddingContact((prevState) => {
            return !prevState;
        })
    }

    function handleContactClicked(event) {
        setActiveContact(event.target.innerText);
    }

    function handleEnterClicked(event) {
        props.setContacts((prevState) => {
            return prevState.concat([newContactNameRef.current.value]);
        })
        setAddingContact(false);
    }

    function handleKeyPressed(event) {
        if(event.key == 'Enter')
            handleEnterClicked({});
    }

    return (
        <div>
            <div>
                {"Hello, " + props.name}
            </div>
            <div>
                <button onClick={setAddContactClicked}>{addingContact? "Cancel": "Add Contact"}</button>
                {addingContact? 
                <div>
                    <input type="text" ref={newContactNameRef} onKeyPress={handleKeyPressed}/>
                    <button onClick={handleEnterClicked }>Enter</button>
                </div>: null}
            </div>
            <div>
                <ContactsList contacts={props.contacts} handleContactClicked={handleContactClicked}/>
            </div>
            <div>
                {activeContact}
                {activeContact.length > 0?
                    <div>
                        <button onClick={clearActiveContact}>
                            X
                        </button>
                        <MessageBox activeContact={activeContact} messages={props.messages} setMessages={props.setMessages} name={props.name} socketManager={props.socketManager}/>
                    </div>: null
                }
            </div>
        </div>
    )
}

export default ChatBox;
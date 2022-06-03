import React, { useRef, useState } from 'react';
import "./ContactsList.css";

function ContactsList(props) {
    return (
        <div>
            {
                props.contacts.map(contact => 
                    <button className="contact" onClick={props.handleContactClicked}>
                        {contact}
                    </button>
                )
            }
        </div>
    )
}

export default ContactsList;
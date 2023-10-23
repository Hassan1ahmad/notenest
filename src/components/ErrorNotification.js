import React from 'react';
import './ErrorNotification.css';

const ErrorNotification = ({ message, onClose }) => {

    return (
        
        <div className="error-notification">
            <p>{message}</p>
            <button onClick={onClose}><i class="fa-solid fa-xmark"></i></button>
        </div>
    );
}

export default ErrorNotification;

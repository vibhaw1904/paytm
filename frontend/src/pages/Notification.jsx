// NotificationButton.js
import React, { useState } from 'react';
import UserRequestsModal from './UserRequestsModal'; // Your modal component
import Button from '../components/Button';
const NotificationButton = () => {
    const [showModal, setShowModal] = useState(false);

    const handleNotificationClick = () => {
        setShowModal(!showModal);
    };

    return (
        <div>

            <Button onClick={handleNotificationClick} label={'Show Requests'}></Button>
            {showModal && <UserRequestsModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default NotificationButton;

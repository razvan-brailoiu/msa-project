import React from 'react';
import './BackButton.css';
import {useNavigate} from "react-router-dom"; // Import the CSS file
import backButton from '../assets/back.png'
const BackButton = ({ destination }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(destination)
    };

    return (
        <button onClick={handleGoBack} className="back-button">
            <img src={backButton} height={'25px'} width={'25px'} />
        </button>
    );
};

export default BackButton;
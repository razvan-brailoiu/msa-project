import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const [authenticated, setAuthenticated] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/dashboard")
    }, []);

    if (!authenticated) {
        // Redirect
    } else {
        return (
            <div>
                <p>Welcome to your Dashboard</p>
            </div>
        );
    }
}
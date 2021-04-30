import { useState, useEffect, useContext } from 'react';
import { MessageContext } from '../contexts/MessageContext';

const Home = () =>
{
    // contexts
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // on component load
    useEffect(clearMessage, []);

    return (
        <div>
            <h1 style={{ fontSize: "48px", fontWeight: "bolder" }}>Welcome to WorkBear</h1>
        </div>
    )
}

export default Home;
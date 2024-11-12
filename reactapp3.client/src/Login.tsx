import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token); // Save the token
            navigate('/dashboard'); // Redirect after login
        } catch (err) {
            setError('Invalid username or password');
            navigate('/'); // Redirect after login
        }
    };

    interface MyComponentProps {
        message: string;
        onClick?: () => void;           // Optional onClick event
        onMouseEnter?: () => void;      // Optional onMouseEnter event
    }

    const MyComponent: React.FC<MyComponentProps> = ({ message, onClick, onMouseEnter }) => {
        const [cursor, setCursor] = useState('default');  // Default cursor style

        // Effect to update the cursor whenever onClick changes
        useEffect(() => {
            if (onClick) {
                setCursor('pointer');  // Set cursor to pointer when onClick is provided
            } else {
                setCursor('default');  // Set cursor to default when no onClick is provided
            }
        }, [onClick]);  // Only re-run when onClick prop changes

        const handleClick = () => {
            console.log('Div clicked!');  // Log the click event
            if (onClick) {
                onClick();  // Call the user's onClick handler if provided
            }
        };

        const handleMouseEnter = () => {
            console.log('Mouse entered the div!');  // Log the mouse enter event
            if (onMouseEnter) {
                onMouseEnter();  // Call the user's onMouseEnter handler if provided
            }
        };

        return (
            <div
                onClick={handleClick}            // Attach custom handleClick function
                onMouseEnter={handleMouseEnter}  // Attach custom handleMouseEnter function
                style={{
                    backgroundColor: '#f0f0f0',
                    borderBottom: '2px solid #333',
                    padding: '10px',
                    cursor,  // Use the dynamically set cursor
                }}
            >
                {message}
            </div>
        );
    };

    return (
        <div>
            <h2><MyComponent message='Hello world, hello buddie'/></h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;

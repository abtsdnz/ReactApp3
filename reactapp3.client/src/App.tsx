import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useEffect, useState, Suspense } from 'react';
import './App.css';

//import Login from './Login';
const Login = React.lazy(() => import('./Login'));

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function ForecastPage() {
    const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }

    return (
        <div>
            <h1 id="tabelLabel">Weather Forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <p><Link to="/login">Go to Login Page</Link></p>
        </div>
    );
}

function QwertyPage() {
    useEffect(() => {
        // Change the document title and body attributes
        document.title = "Qwerty Page - Hello Mate!";
        document.body.style.backgroundColor = "#f0f8ff"; // Example: change background color

        // Cleanup function to reset changes when leaving the page
        return () => {
            document.title = "React App"; // Reset title when leaving the page
            document.body.style.backgroundColor = ""; // Reset body styles
        };
    }, []);

    return (
        <div>
            <h2>Hey mate</h2>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ForecastPage />} />
                <Route path="/login" element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Login />
                    </Suspense>
                } />
                <Route path="/client/qwerty" element={<QwertyPage />} />
            </Routes>
        </Router>
    );
}
export default App;

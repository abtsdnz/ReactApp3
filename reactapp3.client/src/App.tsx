import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CourtTimeSelector from './CourtTimeSelector';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade';

const LazyLogin = lazy(() => import('./Login'));
const LazyUserDetails = lazy(() => import('./UserDetails'));

function DisplayLazyLoad() {
    return (
        <Fade in={true}>
            <Box height='100%' width='100%' alignItems='center' justifyContent='center' sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </Fade >
    );
}

function Page() {
    return (
        <Suspense fallback={<DisplayLazyLoad />}>
            <LazyLogin />
        </Suspense>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Page />} />
                <Route path="/index" element={<Page />} />
                <Route path="/users/:id/:pp" element={<LazyUserDetails />} />
                <Route path="/ab" element={<CourtTimeSelector />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

//import Login from './Login';
//const Login = React.lazy(() => import('./Login'));
//const CourtTimeSelector = React.lazy(() => import('./CourtTimeSelector'));

//interface Forecast {
//    date: string;
//    temperatureC: number;
//    temperatureF: number;
//    summary: string;
//}

//function ForecastPage() {
//    const [forecasts, setForecasts] = useState<Forecast[]>();

//    const navigate = useNavigate();

//    useEffect(() => {
//        populateWeatherData();
//        navigate('/ab');
//    }, [navigate]);

//    const contents = forecasts === undefined
//        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//        : <table className="table table-striped" aria-labelledby="tabelLabel">
//            <thead>
//                <tr>
//                    <th>Date</th>
//                    <th>Temp. (C)</th>
//                    <th>Temp. (F)</th>
//                    <th>Summary</th>
//                </tr>
//            </thead>
//            <tbody>
//                {forecasts.map(forecast =>
//                    <tr key={forecast.date}>
//                        <td>{forecast.date}</td>
//                        <td>{forecast.temperatureC}</td>
//                        <td>{forecast.temperatureF}</td>
//                        <td>{forecast.summary}</td>
//                    </tr>
//                )}
//            </tbody>
//        </table>;

//    async function populateWeatherData() {
//        const response = await fetch('weatherforecast');
//        const data = await response.json();
//        setForecasts(data);
//    }

//    return (
//        <div>
//            <Demo />
//            <Stack spacing={2} direction="row">
//                <Button variant="text">Text</Button>
//                <Button variant="contained">Contained</Button>
//                <Button variant="outlined">Outlined</Button>
//            </Stack>
//            <h1>Weather Forecast</h1>
//            <Typography variant="h1" gutterBottom>Weather Forecast</Typography>
//            <p>This component demonstrates fetching data from the server.</p>
//            {contents}
//            <p><Link to="/login">Go to Login Page</Link></p>
//            <p><Link to="/ab">Go to ab Page</Link></p>
//        </div>
//    );
//}

//function App() {
//    return (
//        <Router>
//            <Routes>
//                <Route path="/" element={<ForecastPage />} />
//                <Route path="/login" element={
//                    <Suspense fallback={<div>Loading...</div>}>
//                        <Login />
//                    </Suspense>
//                } />
//                <Route path="/ab" element={
//                    <Suspense fallback={null}>
//                        <CourtTimeSelector />
//                    </Suspense>
//                } />
//            </Routes>
//        </Router>
//    );
//}

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import TwoDimensionalMapVisualization from '../components/visualizations/TwoDimensionalMapVisual';


function MainPage() {
    const [count, setCount] = useState(0)
    const navigate = useNavigate();
    const message = { "message": "404" };
    return (
        <div>
            <h3>Testing</h3>
            <div>
                <TwoDimensionalMapVisualization/>
            </div>

            <h2>Sign in Page</h2>
            <button className="btn btn-primary" onClick={() => navigate("/signin", { state: { "message": message } })}>Sign in page</button>
            <h2>Log in page</h2>
            <button className="btn btn-secondary" onClick={() => navigate("/login", { state: { "message": "410" } })}>Login page</button>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    )
}

export default MainPage
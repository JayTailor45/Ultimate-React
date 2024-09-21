import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";
import {useEffect, useState} from "react";

function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const URL = "http://localhost:8000"

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (e) {
                alert("Error in loading data")
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities().then();
    }, []);

    return (
        <div>
            <h3>Hello React Navigation</h3>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}></Route>
                    <Route path="product" element={<Product/>}></Route>
                    <Route path="pricing" element={<Pricing />}></Route>
                    <Route path="app" element={<AppLayout />}>
                        <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
                        <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
                        <Route path="countries" element={<p>Countries</p>} />
                        <Route path="form" element={<p>Form</p>} />
                    </Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App

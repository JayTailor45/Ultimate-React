import PageNav from "../components/PageNav.jsx";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <PageNav />
            <h2>
                Home
            </h2>
            <Link to="/app">Go to App</Link>
        </div>
    );
}

export default Home;
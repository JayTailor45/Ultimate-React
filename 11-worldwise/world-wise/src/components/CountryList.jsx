import styles from './CountryList.module.css';
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";

function CountryList({cities, isLoading}) {

    if(isLoading) return <Spinner />;

    if(!countries?.length) return <Message message="Add your first city by clicking on the map"/>

    return (
        <ul className={styles.countryList}>
            {countries.map(city => (<CityItem key={city.id} city={city} />))}
        </ul>
    );
}

export default CountryList;

import {useState} from "react";
import Stats from "./Stats";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";

const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packed: false},
    {id: 2, description: "Socks", quantity: 12, packed: false},
    {id: 3, description: "Charger", quantity: 1, packed: true},
];

function App() {
    const [items, setItems] = useState([...initialItems]);

    function setItemToArray(item) {
        setItems((items) => [...items, item]);
    }

    function deleteItemFromArray(itemId) {
        setItems((items) => items.filter(item => item.id !== itemId));
    }

    function handleToggleItem(id) {
        setItems(items => items.map(item => (
            item.id === id ? {...item, packed: !item.packed} : {...item}
        )));
    }

    function onClearList() {
        setItems([]);
    }

    return (
        <div className="app">
            <Logo/>
            <Form onAddItems={setItemToArray}/>
            <PackingList
                items={items}
                onDeleteItem={deleteItemFromArray}
                handleToggleItem={handleToggleItem}
                onClearList={onClearList}
            />
            <Stats items={items}/>
        </div>
    );
}

export default App;

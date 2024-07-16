import {useState} from "react";

const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packed: false},
    {id: 2, description: "Socks", quantity: 12, packed: false},
    {id: 3, description: "Charger", quantity: 1, packed: true},
];

function Logo() {
    return <h1>Far Away 🤯</h1>
}


function Form({onAddItems}) {

    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(event) {
        event.preventDefault();

        if (!description) return;

        const newItem = {description, quantity, packed: false, id: Date.now()};

        onAddItems(newItem);

        setQuantity(1);
        setDescription('');
    }

    return <form className={"add-form"} onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
            {Array.from({length: 20}, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>
                    {num}
                </option>
            ))}
        </select>
        <input
            type="text"
            placeholder={"Item..."}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
    </form>
}


function Item({item, onDeleteItem, handleToggleItem}) {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => handleToggleItem(item.id)}
            />
            <span
                style={item.packed ? {textDecoration: "line-through"} : {}}
            >
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}


function PackingList({items, onDeleteItem, handleToggleItem, onClearList}) {
    const [sortBy, setSortBy] = useState('input');

    let sortedItems;

    if (sortBy === 'input') sortedItems = items;
    if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => b.packed - a.packed);

    return <div className={"list"}>
        <ul>
            {sortedItems && sortedItems.length > 0 && sortedItems.map(item => (
                <Item
                    item={item}
                    key={item.id}
                    onDeleteItem={onDeleteItem}
                    handleToggleItem={handleToggleItem}
                />
            ))}
        </ul>

        <div className={"actions"}>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="input">Sort by input order</option>
                <option value="description">Sort by description</option>
                <option value="packed">Sort by packed status</option>
            </select>
            <button onClick={() => onClearList()}>Clear List</button>
        </div>
    </div>
}


function Stats({items}) {

    if (!items.length) {
        return <p className={"stats"}>
            <em>Start adding some items to your packing list</em>
        </p>
    }

    const numItems = items.length;
    const packedItems = items.filter(item => item.packed).length;
    const percentage = Math.round(packedItems / numItems * 100);

    return (
        <footer className={"stats"}>
            <em>
                {percentage === 100 ? 'You got everything! Ready to go ✈️' : `📦 You have ${numItems} items on your list and you already packed ${packedItems} (${percentage}%)`}
            </em>
        </footer>
    );
}


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

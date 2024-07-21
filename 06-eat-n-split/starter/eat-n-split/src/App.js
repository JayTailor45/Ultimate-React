import {useState} from "react";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

function App() {

    const [friends, setFriends] = useState(initialFriends);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleShowFormClick() {
        setShowAddFriend(current => !current);
    }

    function handleAddFriend(friend) {
        setFriends(friends => [...friends, friend]);
        setShowAddFriend(false);
    }

    function handleSelection(friend) {
        setSelectedFriend(selected => selected?.id === friend.id ? null : friend);
        setShowAddFriend(false);
    }


    function handleSplitBill(value) {
        setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? {
            ...friend,
            balance: friend.balance + value
        } : friend));

        setSelectedFriend(null);
    }

    return (
        <div className={"app"}>
            <div className={"sidebar"}>
                <FriendList friends={friends} selectedFriend={selectedFriend} onSelection={handleSelection}/>

                {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}

                <Button onClick={handleShowFormClick}>
                    {showAddFriend ? 'Close' : 'Add Friend'}
                </Button>
            </div>
            {selectedFriend && <FormSpiltBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}
        </div>
    );
}

function FriendList({friends, selectedFriend, onSelection}) {

    return (
        <ul>
            {friends.map(friend => (
                <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}/>
            ))}
        </ul>
    );
}

function Friend({friend, selectedFriend, onSelection}) {
    const isSelected = selectedFriend?.id === friend.id;
    return (
        <li className={isSelected ? 'selected' : ''}>
            <img src={friend.image} alt={friend.name}/>
            <h3>{friend.name}</h3>

            {friend.balance < 0 && <p className={'red'}>You owe {friend.name} ${Math.abs(friend.balance)}</p>}
            {friend.balance > 0 && <p className={'green'}>{friend.name} owes you ${Math.abs(friend.balance)}</p>}
            {friend.balance === 0 && <p>You and your friend are even</p>}

            <Button onClick={() => onSelection(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
        </li>
    );
}

function FormAddFriend({onAddFriend}) {

    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    function handleSubmit(e) {
        e.preventDefault();

        const id = crypto.randomUUID();
        const newFriend = {
            id,
            name,
            image: `${image}?=${id}`,
            balance: 0,
        }

        setName('');
        setImage('https://i.pravatar.cc/48');

        onAddFriend(newFriend);
    }

    return (
        <form className={"form-add-friend"}>
            <label>👯Friend Name</label>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <label>🌄Image URL</label>
            <input
                type="text"
                value={image}
                onChange={e => setImage(e.target.value)}
            />

            <Button onClick={handleSubmit}>Add</Button>
        </form>
    );
}

function Button({onClick, children}) {
    return <button onClick={onClick} className={"button"}>{children}</button>
}

function FormSpiltBill({selectedFriend, onSplitBill}) {
    const [bill, setBill] = useState('');
    const [paidByUser, setPaidByUser] = useState('');
    const [whoIsPaying, setWhoIsPaying] = useState('user');
    const paidByFriend = bill ? bill - paidByUser : '';

    function handleSubmit(e) {
        e.preventDefault();

        if (!bill || !paidByUser) return;

        onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
    }

    return (
        <form className={"form-split-bill"}>
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>💰Bill Amount</label>
            <input type="text" value={bill} onChange={(e) => setBill(+e.target.value)}/>

            <label>🧍Your Expense</label>
            <input type="text" value={paidByUser} onChange={(e) => setPaidByUser(+e.target.value)}/>

            <label>🤼{selectedFriend.name}'s Expense</label>
            <input type="text" value={paidByFriend} disabled/>

            <label>🤑Who is Paying</label>
            <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button onClick={handleSubmit}>Split Bill</Button>
        </form>
    );
}

export default App;
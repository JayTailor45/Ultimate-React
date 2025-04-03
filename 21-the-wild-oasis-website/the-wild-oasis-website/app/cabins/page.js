import React from "react";
import Counter from "../components/Counter";

export default async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(`Server`, data);
  return (
    <>
      <h1>Cabins</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Counter users={data} />
    </>
  );
}

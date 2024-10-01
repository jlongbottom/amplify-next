"use client";

import React, { useState } from "react";
import data from "./data.json";

interface Person {
  id: number;
  name: string;
  age: number;
}

const people: Person[] = data;

const StringList: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredItems = people.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (sort === "name") {
    filteredItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "age") {
    filteredItems.sort((a, b) => a.age - b.age);
  }

  return (
    <div>
      <button onClick={() => setSort("name")}>Sort by name</button>
      <button onClick={() => setSort("age")}>Sort by age</button>
      <br />
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter items..."
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>
            {item.name}, {item.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StringList;

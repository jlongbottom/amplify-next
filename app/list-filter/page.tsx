"use client"

import React, { useState } from 'react';

interface StringListProps {
  items?: string[];
}

const StringList: React.FC<StringListProps> = ({ items = ["test", "justin"] }) => {
  const [filter, setFilter] = useState<string>('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter items..."
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default StringList;

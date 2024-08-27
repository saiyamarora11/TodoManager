import React from 'react';
import { OrderBy, SortOptions, SortType } from '../types/userTable'; 

type SortOrderDropdownProps = {
  sortOrder: OrderBy;
  sortType: SortType;
  onOrderChange: (order: OrderBy) => void;
  onTypeChange: (type: SortType) => void;
  onSortChange: (sort: SortOptions) => void; 
};

const SortOrderDropdown: React.FC<SortOrderDropdownProps> = ({
  sortOrder,
  sortType,
  onOrderChange,
  onTypeChange,
  onSortChange
}) => {
  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onOrderChange(event.target.value as OrderBy);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortType = event.target.value as SortType;
    onTypeChange(newSortType);
  
    const newSortOption = (() => {
      switch (newSortType) {
        case 'name':
          return SortOptions.Name;
        case 'priority':
          return SortOptions.Priority;
        case 'dueDate':
          return SortOptions.Date;
      }
    })();
    if (newSortOption) onSortChange(newSortOption);
  };

  return (
    <div className="mt-4 relative">
      <label className="text-white text-sm">Sort Options:</label>
      <div className="flex flex-col mt-2 space-y-2">
        <div className="flex items-center gap-x-4">
          <select
            value={sortType}
            onChange={handleTypeChange}
            className="select-container"
          >
            <option value="name">By Name</option>
            <option value="priority">By Priority</option>
            <option value="dueDate">By Date</option>
          </select>
          <select
            value={sortOrder}
            onChange={handleOrderChange}
            className="select-container"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortOrderDropdown;

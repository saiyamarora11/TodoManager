import React, { useState, useMemo } from 'react';
import {
  FilterDropdown,
  SortDropdown,
  SortOrderDropdown,
  UsersTable,
  FilterInput,
} from "./components"; 
import { FilterOptions, SortOptions, Priority, SortType, DateFilterType } from "./types/userTable";

const initialState = {
  selectedFilter: '' as FilterOptions | '',
  searchTerm: '',
  selectedSort: '' as SortOptions | '',
  sortOrder: 'asc' as 'asc' | 'desc',
  sortType: 'name' as SortType,
  selectedPriorities: [] as Priority[],
  dateFilterType: DateFilterType.Is,
};

const App: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOptions | ''>(initialState.selectedFilter); 
  const [searchTerm, setSearchTerm] = useState<string>(initialState.searchTerm); 
  const [selectedSort, setSelectedSort] = useState<SortOptions | ''>(initialState.selectedSort); 
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialState.sortOrder);
  const [sortType, setSortType] = useState<SortType>(initialState.sortType); 
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>(initialState.selectedPriorities); 
  const [dateFilterType, setDateFilterType] = useState<DateFilterType>(initialState.dateFilterType); 

  // Helper function to map SortOptions to SortType
  const mapSortOptionsToSortType = (sort: SortOptions): SortType => {
    switch (sort) {
      case SortOptions.Name:
        return 'name';
      case SortOptions.Priority:
        return 'priority';
      case SortOptions.Date:
        return 'date';
      default:
        return 'name'; // Default case, can be adjusted based on logic
    }
  };

  const applyFilter = (filter: FilterOptions) => {
    setSelectedFilter(filter); 
    setSearchTerm(''); 
    setSelectedPriorities([]); 
  };

  const applySort = (sort: SortOptions) => {
    setSelectedSort(sort);
    // Update sortType based on selectedSort using the mapping function
    setSortType(mapSortOptionsToSortType(sort));
  };

  const updateSortOrder = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const updateSortType = (type: SortType) => {
    setSortType(type);
  };

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const updateSelectedPriorities = (priorities: Priority[]) => {
    setSelectedPriorities(priorities);
  };

  const updateDateFilterType = (filterType: DateFilterType) => {
    setDateFilterType(filterType);
  };

  const resetFiltersAndSorting = () => {
    setSelectedFilter(initialState.selectedFilter);
    setSearchTerm(initialState.searchTerm);
    setSelectedSort(initialState.selectedSort);
    setSortOrder(initialState.sortOrder);
    setSortType(initialState.sortType);
    setSelectedPriorities(initialState.selectedPriorities);
    setDateFilterType(initialState.dateFilterType);
  };

  const isResetVisible = useMemo(() => 
    selectedFilter || 
    searchTerm || 
    selectedSort || 
    selectedPriorities.length > 0,
    [selectedFilter, searchTerm, selectedSort, selectedPriorities]
  );

  return (
    <div className='h-screen w-full bg-black'>
      <div className="pt-10 px-10">
        <h1 className="text-white font-bold text-2xl">Todo Manager</h1>
        <div className="flex justify-end w-full border-b pb-2 items-center">
          <div className='flex gap-x-3 items-center'>
            <FilterDropdown onSelect={applyFilter} />
            <SortDropdown onSelect={applySort} />
            {isResetVisible && (
              <button
                className="text-gray-600 font-bold text-sm"
                onClick={resetFiltersAndSorting}
              >
                Reset
              </button>
            )}
          </div>
        </div>
        {selectedSort && (
          <SortOrderDropdown 
            sortOrder={sortOrder} 
            sortType={sortType} 
            onOrderChange={updateSortOrder} 
            onTypeChange={updateSortType} 
          />
        )}
        {selectedFilter && (
          <FilterInput
            selectedFilter={selectedFilter}
            searchTerm={searchTerm}
            onSearchChange={updateSearchTerm}
            selectedPriorities={selectedPriorities} 
            onPrioritiesChange={updateSelectedPriorities}
            onFilterChange={applyFilter}
            dateFilterType={dateFilterType}
            onDateFilterTypeChange={updateDateFilterType}
          />
        )}
        <p className="text-white font-bold text-md mt-4">Todos</p>
        <div className='mt-4'>
          <UsersTable
            selectedFilter={selectedFilter}
            searchTerm={searchTerm}
            selectedSort={selectedSort}
            sortOrder={sortOrder}
            sortType={sortType} 
            selectedPriorities={selectedPriorities} 
            dateFilterType={dateFilterType}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

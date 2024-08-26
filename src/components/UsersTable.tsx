import { useMemo } from 'react';
import { demoUsers, headers } from "../data/demoUsers";
import { UserProps, SortOptions, Priority, SortType, DateFilterType } from '../types/userTable';
import { DateTime } from 'luxon';

type UserTableProps = {
  selectedFilter: 'Name' | 'Priority' | 'Due Date' | ''; 
  searchTerm: string;
  selectedSort: SortOptions | '';
  sortOrder: 'asc' | 'desc';
  sortType: SortType;
  selectedPriorities: Priority[];
  dateFilterType: DateFilterType; 
};

const filterUsers = (
  users: UserProps[],
  filter: 'Name' | 'Priority' | 'Due Date' | '',
  term: string,
  priorities: Priority[],
  dateFilterType: DateFilterType
): UserProps[] => {
  const trimmedTerm = term.trim().toLowerCase();
  if (filter === '') {
    return users; 
  }

  return users.filter((user) => {
    switch (filter) {
      case 'Name':
        return user.name.trim().toLowerCase().includes(trimmedTerm);

      case 'Priority':
        return priorities.length > 0
          ? priorities.includes(user.priority as Priority)
          : true;

      case 'Due Date': {
        if (!term) return true; 

        const dateTerm = DateTime.fromISO(term, { zone: 'utc' }).startOf('day');
        const userDate = DateTime.fromFormat(user.dueDate, 'dd/MM/yyyy', { zone: 'utc' }).startOf('day');
        
        switch (dateFilterType) {
          case DateFilterType.Is:
            return userDate.equals(dateTerm);

          case DateFilterType.IsBefore:
            return userDate < dateTerm;

          case DateFilterType.IsAfter:
            return userDate > dateTerm;

          default:
            return true;
        }
      }

      default:
        return true;
    }
  });
};

const sortUsers = (
  users: UserProps[],
  sort: SortOptions,
  order: 'asc' | 'desc'
): UserProps[] => {
  const priorityOrder: { [key in Priority]: number } = {
    [Priority.High]: 3,
    [Priority.Medium]: 2,
    [Priority.Low]: 1
  };

  return [...users].sort((a, b) => {
    const isAsc = order === 'asc';

    switch (sort) {
      case SortOptions.Name:
        return isAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);

      case SortOptions.Priority:
        return isAsc
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      
      case SortOptions.Date: {
        const aDate = DateTime.fromFormat(a.dueDate, 'dd/MM/yyyy', { zone: 'utc' }).toMillis();
        const bDate = DateTime.fromFormat(b.dueDate, 'dd/MM/yyyy', { zone: 'utc' }).toMillis();
        return isAsc ? aDate - bDate : bDate - aDate;
      }

      default:
        return 0;
    }
  });
};

const UsersTable = ({
  selectedFilter,
  searchTerm,
  selectedSort,
  sortOrder,
  selectedPriorities,
  dateFilterType 
}: UserTableProps) => {
  // Memoize filtered users
  const filteredUsers = useMemo(
    () => filterUsers(demoUsers, selectedFilter, searchTerm, selectedPriorities, dateFilterType),
    [selectedFilter, searchTerm, selectedPriorities, dateFilterType]
  );

  // Memoize sorted users
  const sortedUsers = useMemo(
    () => (selectedSort ? sortUsers(filteredUsers, selectedSort, sortOrder) : filteredUsers),
    [filteredUsers, selectedSort, sortOrder]
  );

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.dueDate}</td>
              <td>{user.priority}</td>
              <td>{user.status}</td>
              <td>{user.taskType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

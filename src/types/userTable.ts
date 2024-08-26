export type UserProps = {
    name: string;
    dueDate: string; 
    priority: Priority;
    status: Status;
    taskType: TaskType;
};

export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}


export enum Status {
    NotStarted = 'Not Started',
    InProgress = 'In progress',
    Done = 'Done'
}

export enum TaskType {
    Improvement = 'Improvement',
    Bug = 'Bug',
    NewFeature = 'New Feature'
}

export enum FilterOptions {
    Name = 'Name',
    Priority = 'Priority',
    Date = 'Due Date',
  }
  export enum SortOptions {
    Name = 'Name',
    Priority = 'Priority',
    Date = "Date",
  }

  export type OrderBy = 'asc' | 'desc';

  export type SortType = 'name' | 'priority' | 'dueDate';

  export enum DateFilterType {
    Is = 'is',
    IsBefore = 'is_before',
    IsAfter = 'is_after'
  }

  
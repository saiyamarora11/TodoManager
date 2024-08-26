//imports
import { Priority, Status, TaskType, UserProps } from "../types/userTable";

export const demoUsers: UserProps[] = [
    { name: "Filtering and Sorting on Users Dashboard", dueDate: "30/08/2024", priority: Priority.Low, status: Status.NotStarted, taskType: TaskType.Improvement },
    { name: "Montoya Delayed Scroll", dueDate: "24/08/2024", priority: Priority.Medium, status: Status.InProgress, taskType: TaskType.Bug },
    { name: "Montoya Header", dueDate: "23/08/2024", priority: Priority.High, status: Status.Done, taskType: TaskType.Improvement },
    { name: "Montoya Navigation Menu", dueDate: "22/08/2024", priority: Priority.High, status: Status.InProgress, taskType: TaskType.Improvement },
    { name: "Montoya Custom Cursor", dueDate: "15/08/2024", priority: Priority.High, status: Status.NotStarted, taskType: TaskType.NewFeature }
  ];

export const headers = [
   'Name',
   'Due Date',
   'Priority',
   'Status',
   'Task Type',
]
    

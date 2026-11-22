import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://localhost:7062/api/Tasks';

  constructor(private http: HttpClient) { }

  // Get all tasks
  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  // Add a new task
  addTask(task: Partial<TaskItem>): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task);
  }

  // Update an existing task
  updateTask(id: number, task: Partial<TaskItem>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, task);
  }

  // Delete a task
  deleteTask(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }
}

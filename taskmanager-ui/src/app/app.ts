import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task';
import type { TaskItem } from './services/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  showAddForm = false;
  editingTaskId: number | null = null;

  newTaskTitle = '';
  newTaskDescription = '';

  searchText = '';
  filterStatus: 'all' | 'pending' | 'completed' = 'all';

  tasks: TaskItem[] = [];

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) { }

  get pendingTasksCount(): number {
    return this.tasks.filter(task => !task.isCompleted).length;
  }

  get completedTasksCount(): number {
    return this.tasks.filter(task => task.isCompleted).length;
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: TaskItem[]) => {
        this.tasks = data;
        this.cdr.markForCheck();

        console.log('Tasks received from API:', data);
        console.log('Number of tasks:', data.length);
      },
      error: (error: unknown) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  get filteredTasks(): TaskItem[] {
    return this.tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.filterStatus === 'all' ||
        (this.filterStatus === 'pending' && !task.isCompleted) ||
        (this.filterStatus === 'completed' && task.isCompleted);

      return matchesSearch && matchesStatus;
    });
  }

  openAddForm(): void {
    this.editingTaskId = null;
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.showAddForm = true;
  }

  closeAddForm(): void {
    this.showAddForm = false;
    this.editingTaskId = null;
    this.newTaskTitle = '';
    this.newTaskDescription = '';
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    const newTask = {
      title: this.newTaskTitle.trim(),
      description: this.newTaskDescription.trim(),
      isCompleted: false
    };

    this.taskService.addTask(newTask).subscribe({
      next: () => {
        this.closeAddForm();
        this.loadTasks();
      },
      error: (error: unknown) => {
        console.error('Error adding task:', error);
      }
    });
  }

  toggleTask(task: TaskItem): void {
    const updatedTask = {
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted
    };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => this.loadTasks(),
      error: (error: unknown) => {
        console.error('Error updating task:', error);
      }
    });
  }

  editTask(task: TaskItem): void {
    this.editingTaskId = task.id;
    this.newTaskTitle = task.title;
    this.newTaskDescription = task.description;
    this.showAddForm = true;
  }

  saveTask(): void {
    if (!this.newTaskTitle.trim() || this.editingTaskId === null) return;

    const updatedTask = {
      title: this.newTaskTitle.trim(),
      description: this.newTaskDescription.trim(),
      isCompleted: this.tasks.find(t => t.id === this.editingTaskId)?.isCompleted ?? false
    };

    this.taskService.updateTask(this.editingTaskId, updatedTask).subscribe({
      next: () => {
        this.closeAddForm();
        this.loadTasks();
      },
      error: (error: unknown) => {
        console.error('Error saving task:', error);
      }
    });
  }

  deleteTask(task: TaskItem): void {
    const confirmed = confirm(
      `هل أنت متأكد من حذف المهمة "${task.title}"؟`
    );

    if (!confirmed) return;

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error deleting task:', error);
        alert('حدث خطأ أثناء حذف المهمة، حاول مرة أخرى.');
      }
    });
  }
}

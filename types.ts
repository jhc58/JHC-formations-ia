
export interface Task {
  id: number;
  task: string;
  recommendedIA: string;
  why: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  tasks: Task[];
  color: string;
}

export interface SearchResult {
  category: Category;
  task: Task;
  relevance: number;
}

export interface Review {
  id: string;
  aiName: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

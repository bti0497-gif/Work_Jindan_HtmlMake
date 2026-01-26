
export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'In Progress' | 'Pending' | 'Completed' | 'Delayed';
  dueDate: string;
  members: string[]; // URLs of avatars
}

export interface Message {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
}

export interface Task {
  id: string;
  text: string;
  dueDate: string;
  completed: boolean;
}

export interface Notification {
  id: string;
  text: string;
  time: string;
  type: 'info' | 'alert' | 'success';
}

export interface ProcessLog {
  id: string;
  projectName: string;
  step: string;
  status: 'Completed' | 'In Progress' | 'Standby';
  updatedAt: string;
}

export interface FileInfo {
  id: string;
  name: string;
  size: string;
  date: string;
  user: string;
  action: 'Uploaded' | 'Deleted';
  type: 'pdf' | 'xlsx' | 'docx' | 'png' | 'zip';
}

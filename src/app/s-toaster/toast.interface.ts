import { ToastType } from './toast.type';

export interface Toast {
  type?: ToastType;
  expert_name?: string;
  project_name?: string;
  delay?: number;
}
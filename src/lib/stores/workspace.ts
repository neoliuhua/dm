import { writable } from 'svelte/store';

export interface Workspace {
  id: string;
  name: string;
  path: string;
}

export const currentWorkspace = writable<Workspace | null>(null);
export const workspaces = writable<Workspace[]>([]);

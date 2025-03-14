import { writable, type Writable } from 'svelte/store';

export const showResourceExplorer: Writable<boolean> = writable(true);
export const showTerminal: Writable<boolean> = writable(true);
export const showRightSidebar: Writable<boolean> = writable(true);
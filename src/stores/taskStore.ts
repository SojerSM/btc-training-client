import { writable } from "svelte/store";
import { type Task } from "../lib/domain/task";
import { sendHttpRequest } from "../util/helpers/httpRestHandler";
import { API_URL } from "../util/global";
import type { Filter } from "../lib/enum/filter";

const initialTasks: Task[] = [];
const selectedId: number[] = [];

export const tasks = writable<Task[]>(initialTasks);
export const selected = writable<number[]>(selectedId);

export const setTasks = (newTasks: Task[]) => {
  tasks.set(newTasks);
};

export const setSelected = (updated: number[]) => {
  selected.set(updated);
};

export const addTask = (newTask: Task) => {
  tasks.update((tasks) => [...tasks, newTask]);
};

export const addSelectedId = (id: number) => {
  selected.update((selected) => [...selected, id]);
  console.log(`id: ${id} added`);
};

export const removeSelectedId = (id: number) => {
  selected.update((selected) =>
    selected.filter((selectedId) => selectedId !== id)
  );
  console.log(`id: ${id} removed`);
};

export const removeById = (ids: number[]) => {
  tasks.update((existing) =>
    existing.filter((task) => task.id !== undefined && !ids.includes(task.id))
  );
};

export const fetchTasks = async (filter: Filter) => {
  setTasks(
    await sendHttpRequest<Task[]>(API_URL.concat(`/task?filter=${filter}`), {
      method: "GET",
    })
  );
};

export const fetchByTitle = async (title: string) => {
  setTasks(
    await sendHttpRequest<Task[]>(API_URL.concat(`/task?title=${title}`), {
      method: "GET",
    })
  );
};

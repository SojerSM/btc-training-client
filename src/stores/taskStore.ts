import { writable } from "svelte/store";
import { type Task } from "../lib/domain/task";
import { sendHttpRequest } from "../util/helpers/httpRestHandler";
import { API_URL } from "../util/global";

const initialTasks: Task[] | undefined = undefined;

export const tasks = writable<Task[]>(initialTasks);

export const getTasks = () => {
  return tasks;
};

export const setTasks = (newTasks: Task[]) => {
  tasks.set(newTasks);
};

export const addTask = (newTask: Task) => {
  tasks.update((tasks) => [...tasks, newTask]);
};

export const populateTasks = async () => {
  setTasks(
    await sendHttpRequest<Task[]>(API_URL.concat("/task"), {
      method: "GET",
    })
  );
};

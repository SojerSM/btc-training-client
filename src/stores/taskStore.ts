import { get, writable } from "svelte/store";
import { type Task } from "../lib/domain/task";
import { sendHttpRequest } from "../util/helpers/httpRestHandler";
import { API_URL } from "../util/global";
import { Filter } from "../lib/enum/filter";
import type { TaskDTO } from "../lib/dto/taskDTO";
import { readSessionValue } from "../util/helpers/sessionStorageHandler";

const initialTasks: Task[] = [];
const selectedId: number[] = [];
const filter: Filter = Filter.ALL;

export const tasks = writable<Task[]>(initialTasks);
export const selected = writable<number[]>(selectedId);
export const currentFilter = writable<Filter>(filter);

export const setTasks = (newTasks: Task[]) => {
  tasks.set(newTasks);
};

export const setSelected = (updated: number[]) => {
  selected.set(updated);
};

export const setCurrentFilter = (updated: Filter) => {
  currentFilter.set(updated);
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
  const id = readSessionValue("accountId");
  setTasks(
    await sendHttpRequest<Task[]>(
      API_URL.concat(`/task?accountId=${id}&filter=${filter}`),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${readSessionValue("jwt")}`,
        },
      }
    )
  );
};

export const fetchByTitle = async (title: string) => {
  const id = readSessionValue("accountId");
  setTasks(
    await sendHttpRequest<Task[]>(
      API_URL.concat(`/task?accountId=${id}&title=${title}`),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${readSessionValue("jwt")}`,
        },
      }
    )
  );
};

export const updateTask = async (id: number, task: TaskDTO) => {
  const response = await sendHttpRequest<TaskDTO>(
    API_URL.concat(`/task/${id}`),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${readSessionValue("jwt")}`,
      },
      body: JSON.stringify(task),
    }
  );

  fetchTasks(get(currentFilter));

  return response;
};

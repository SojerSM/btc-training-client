<script lang="ts">
  export let task;

  import { getContext } from "svelte";
  import type { Context } from "svelte-simple-modal";
  import AddTaskForm from "../forms/AddTaskForm.svelte";
  import type { TaskDTO } from "../../lib/dto/taskDTO";
  import {
    addSelectedId,
    removeSelectedId,
    updateTask,
  } from "../../stores/taskStore";

  const { open } = getContext<Context>("simple-modal");
  const showModal = () => open(AddTaskForm);

  const handleSelect = (event: Event) => {
    const isChecked: boolean = (event.target as HTMLInputElement).checked;
    isChecked ? addSelectedId(task.id) : removeSelectedId(task.id);
  };

  const handleSetFinished = (event: Event) => {
    const isChecked: boolean = (event.target as HTMLInputElement).checked;

    const updated: TaskDTO = {
      title: task.title,
      deadline: task.deadline,
      finished: isChecked,
    };

    const data = updateTask(task.id, updated);
    console.log(data);
  };
</script>

<div>
  <input type="checkbox" on:change={handleSelect} />
  <button on:click={showModal}>Edytuj</button>
  <p
    class={`${task.finished ? "done" : new Date(task.deadline) < new Date() ? "outdated" : ""}`}
  >
    {task.title}
  </p>
  <input
    type="checkbox"
    checked={task.finished}
    on:change={handleSetFinished}
  />
  <p class={`${task.finished ? "done" : ""}`}>
    {task.deadline.toLocaleString()}
  </p>
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.4rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid lightgray;
  }

  input:first-child {
    width: 3%;
  }

  button {
    width: 4.5rem;
    margin-right: 0.5rem;
  }

  p:first-of-type {
    width: 40%;
  }

  input:last-of-type {
    width: 8%;
  }

  p:last-of-type {
    margin-left: 2rem;
  }

  .done {
    color: lime;
  }

  .outdated {
    color: red;
  }
</style>

<script lang="ts">
  export let task;

  import { getContext } from "svelte";
  import type { Context } from "svelte-simple-modal";
  import AddTaskForm from "../forms/AddTaskForm.svelte";

  const { open } = getContext<Context>("simple-modal");
  const showModal = () => open(AddTaskForm);
</script>

<div>
  <input type="checkbox" value="" />
  <button on:click={showModal}>Edytuj</button>
  <p>{task.title}</p>
  <input type="checkbox" value="" />
  <p>{task.deadline.toLocaleString()}</p>
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.5rem;
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
</style>

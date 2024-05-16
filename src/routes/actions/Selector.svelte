<script lang="ts">
  import { getContext } from "svelte";
  import type { Context } from "svelte-simple-modal";
  import AddTaskForm from "../forms/AddTaskForm.svelte";
  import RemoveTasksForm from "../forms/RemoveTasksForm.svelte";
  import { Filter } from "../../lib/enum/filter";
  import { fetchTasks } from "../../stores/taskStore";

  const { open } = getContext<Context>("simple-modal");
  const showModalAdd = () => open(AddTaskForm);
  const showModalDel = () => open(RemoveTasksForm);
</script>

<div class="internal-nav">
  <ul>
    <li>
      <button class="option" on:click={() => fetchTasks(Filter.ALL)}
        >Wszystkie</button
      >
    </li>
    <li>
      <button class="option" on:click={() => fetchTasks(Filter.DONE)}
        >Wykonane</button
      >
    </li>
    <li>
      <button class="option" on:click={() => fetchTasks(Filter.PENDING)}
        >Oczekujące</button
      >
    </li>
    <li>
      <button class="option" on:click={() => fetchTasks(Filter.OUTDATED)}
        >Przeterminowane</button
      >
    </li>
  </ul>
  <div class="action-btns">
    <button on:click={showModalAdd}>Dodaj</button>
    <button on:click={showModalDel}>Usuń</button>
  </div>
</div>

<style>
  .internal-nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 3vh;
  }

  ul {
    display: flex;
    flex-direction: row;
    gap: 3vw;

    list-style-type: none;
  }

  li {
    cursor: pointer;

    transition: color 0.2s ease;
  }

  li:hover {
    color: rgb(46, 46, 46);
  }

  li:active {
    font-weight: 500;
    color: black;
  }

  .action-btns {
    display: flex;
    gap: 1vw;
  }

  .option {
    all: unset;
  }
</style>

<script lang="ts">
  import { getContext } from "svelte";
  import type { Context } from "svelte-simple-modal";
  import AddTaskForm from "../forms/AddTaskForm.svelte";

  const { open } = getContext<Context>("simple-modal");
  const showModal = () => open(AddTaskForm);
</script>

<div class="internal-nav">
  <ul>
    <li>Wszystkie</li>
    <li>Wykonane</li>
    <li>Oczekujące</li>
    <li>Przeterminowane</li>
  </ul>
  <div class="action-btns">
    <button on:click={showModal}>Dodaj</button>
    <button on:click={showModal}>Usuń</button>
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

  .action-btns {
    display: flex;
    gap: 1vw;
  }
</style>

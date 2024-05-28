<script lang="ts">
  import { onMount } from "svelte";
  import TaskDetail from "./TaskDetail.svelte";
  import { tasks, fetchTasks, fetchByTitle } from "../../stores/taskStore";
  import { Filter } from "../../lib/enum/filter";
  import { Input } from "@svelteuidev/core";
  import { MagnifyingGlass } from "radix-icons-svelte";

  let searchQuery: string;

  onMount(async () => {
    await fetchTasks(Filter.ALL);
    searchQuery = "";
  });

  const searchByTitle = async (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const query = (event.target as HTMLInputElement).value.trim();
      await fetchByTitle(query);
    }
  };
</script>

<div class="task-wrapper">
  <div class="search-bar">
    <Input
      icon={MagnifyingGlass}
      size="xs"
      id="search-field"
      type="text"
      placeholder="wyszukaj"
      bind:value={searchQuery}
      on:keydown={searchByTitle}
    />
  </div>
  <div class="labels">
    <p>ZADANIE</p>
    <p>WYKONANE</p>
    <p>TERMIN</p>
  </div>
  <ul class="task-list">
    {#if $tasks}
      {#key $tasks}
        {#each $tasks as task}
          <li><TaskDetail {task} /></li>
        {/each}
      {/key}
    {/if}
    {#if $tasks.length === 0}
      <p class="alternative">Brak zadań do wyświetlenia.</p>
    {/if}
  </ul>
</div>

<style>
  .task-wrapper {
    background-color: rgb(245, 245, 245);
    border-radius: 8px;
    padding: 0.5rem;
  }

  .labels {
    display: flex;
    flex-direction: row;
    font-size: 90%;
    margin-top: 0.5rem;
    color: rgb(17, 17, 17);

    border-top: 1px solid rgb(151, 151, 151);
    border-bottom: 1px solid rgb(151, 151, 151);
  }

  .task-list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  p:first-child {
    margin-left: calc(5rem + 3%);
    width: 40%;
  }

  p:nth-child(2) {
    width: 8%;
  }

  p:nth-child(3) {
    margin-left: 2rem;
  }

  .alternative {
    margin-top: 1rem;
    align-self: center;
  }

  .search-bar {
    width: 30%;
  }
</style>

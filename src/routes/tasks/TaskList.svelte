<script lang="ts">
  import { onMount } from "svelte";
  import { type Task } from "../../lib/domain/task";
  import TaskDetail from "./TaskDetail.svelte";
  import { tasks, populateTasks } from "../../stores/taskStore";

  onMount(async () => {
    await populateTasks();
  });
</script>

<div class="task-wrapper">
  <input type="text" placeholder="wyszukaj" />
  <div class="labels">
    <p>ZADANIE</p>
    <p>WYKONANE</p>
    <p>TERMIN</p>
  </div>
  <ul class="task-list">
    {#if $tasks}
      {#each $tasks as task}
        <li><TaskDetail {task} /></li>
      {/each}
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
  }

  p:first-child {
    margin-left: calc(5rem + 3%);
    width: 40%;
  }

  p:nth-child(2) {
    width: 8%;
  }
</style>

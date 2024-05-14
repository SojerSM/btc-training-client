<script>
  import Selector from "./actions/Selector.svelte";
  import TaskList from "./tasks/TaskList.svelte";
</script>

<div>
  <Selector />
  <TaskList />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

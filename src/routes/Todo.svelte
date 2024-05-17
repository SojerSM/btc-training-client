<script lang="ts">
  import Selector from "./actions/Selector.svelte";
  import TaskList from "./tasks/TaskList.svelte";
  import { Modal } from "svelte-simple-modal";
</script>

<div>
  <Modal>
    <Selector />
    <TaskList />
  </Modal>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 55vw;
  }
</style>

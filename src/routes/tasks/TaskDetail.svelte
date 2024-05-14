<script lang="ts">
  export let task;
</script>

<div>
  <input type="checkbox" value="" />
  <button>Edytuj</button>
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

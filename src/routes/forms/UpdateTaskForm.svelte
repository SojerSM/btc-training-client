<script lang="ts">
  import type { TaskDTO } from "../../lib/dto/taskDTO";
  import { sendHttpRequest } from "../../util/helpers/httpRestHandler";
  import { API_URL } from "../../util/global";
  import { updateTask } from "../../stores/taskStore";

  export let id;

  let title: string;
  let deadline: Date;
  let finished: boolean;

  const handleSubmit = async () => {
    const task: TaskDTO = {
      title,
      deadline,
      finished,
    };

    updateTask(id, task);

    const data = await sendHttpRequest<TaskDTO>(API_URL.concat(`/task/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  };
</script>

<div>
  <h2>Zaktualizuj zadanie</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="opis" bind:value={title} />
    <input type="datetime-local" bind:value={deadline} />
    <input type="checkbox" bind:checked={finished} />
    <button type="button" on:click={handleSubmit}>Dodaj</button>
  </form>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  h2 {
    align-self: center;
    margin-bottom: 2rem;
  }

  form {
    width: 100%;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
  }

  input:first-child {
    width: 70%;
  }
</style>

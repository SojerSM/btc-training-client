<script lang="ts">
  import { API_URL } from "../../util/global";
  import { type TaskDTO } from "../../lib/dto/taskDTO";
  import { sendHttpRequest } from "../../util/helpers/httpRestHandler";
  import { addTask } from "../../stores/taskStore";

  let title: string;
  let deadline: Date;

  const handleSubmit = async () => {
    const task: TaskDTO = {
      title: title,
      deadline: deadline,
    };

    sendHttpRequest(API_URL.concat("/task"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    addTask({
      title: task.title,
      isFinished: false,
      deadline: task.deadline,
    });
  };
</script>

<div>
  <h2>Nowe zadanie</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="opis" bind:value={title} />
    <input type="datetime-local" bind:value={deadline} />
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

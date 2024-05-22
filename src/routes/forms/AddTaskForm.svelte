<script lang="ts">
  import { API_URL } from "../../util/global";
  import { type TaskDTO } from "../../lib/dto/taskDTO";
  import { sendHttpRequest } from "../../util/helpers/httpRestHandler";
  import { addTask } from "../../stores/taskStore";
  import { readSessionValue } from "../../util/helpers/sessionStorageHandler";

  let title: string;
  let deadline: Date;
  let finished: boolean;

  const handleSubmit = async () => {
    const accountId = readSessionValue("accountId");

    if (accountId) {
      const task: TaskDTO = {
        title,
        deadline,
        finished,
        accountId: +accountId,
      };

      const data = await sendHttpRequest<TaskDTO>(API_URL.concat("/task"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${readSessionValue("jwt")}`,
        },
        body: JSON.stringify(task),
      });

      addTask({
        id: data.id,
        title: task.title,
        finished: task.finished,
        deadline: task.deadline,
        accountId: +accountId,
      });
    }
  };
</script>

<div>
  <h2>Nowe zadanie</h2>
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

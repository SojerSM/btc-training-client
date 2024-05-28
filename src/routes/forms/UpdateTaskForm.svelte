<script lang="ts">
  import { getContext } from "svelte";
  import type { Context } from "svelte-simple-modal";
  import type { TaskDTO } from "../../lib/dto/taskDTO";
  import { updateTask } from "../../stores/taskStore";
  import toast, { Toaster } from "svelte-french-toast";

  export let task;

  const { close } = getContext<Context>("simple-modal");

  let title: string = task.title;
  let deadline: Date = task.deadline;
  let finished: boolean = task.finished;

  const handleSubmit = async () => {
    const dto: TaskDTO = {
      title,
      deadline,
      finished,
      accountId: task.id,
    };

    const response = await updateTask(task.id, dto);

    if (response === null) {
      toast.error("Coś poszło nie tak.");
      return;
    }

    toast.success("Poprawnie zaktualizowano zadanie.");
    close();
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
  <Toaster />
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

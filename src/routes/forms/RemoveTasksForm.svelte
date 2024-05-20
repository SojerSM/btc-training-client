<script lang="ts">
  import { getContext } from "svelte";
  import type { Context } from "svelte-simple-modal";
  import { selected, removeById, setSelected } from "../../stores/taskStore";
  import { sendHttpRequest } from "../../util/helpers/httpRestHandler";
  import { API_URL } from "../../util/global";
  import { readSessionValue } from "../../util/helpers/sessionStorageHandler";

  const { close } = getContext<Context>("simple-modal");

  console.log($selected);

  const handleRemove = async () => {
    await sendHttpRequest<number[]>(API_URL.concat("/task"), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${readSessionValue("jwt")}`,
      },
      body: JSON.stringify($selected),
    });

    removeById($selected);
    setSelected([]);
  };

  const closeModalDel = () => close();
</script>

<div class="form-wrapper">
  {#if $selected.length === 0}
    <div class="content"><h3>Nie zaznaczono zadań do usunięcia.</h3></div>
  {/if}
  {#if $selected.length > 0}
    <div class="content">
      <h4>Liczba zadań do usunięcia: {$selected.length}</h4>
      <p>Czy potwierdzasz?</p>
      <div class="actions">
        <button type="button" on:click={handleRemove}>Tak</button>
        <button type="button" on:click={closeModalDel}>Nie</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .content {
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .actions {
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }
</style>

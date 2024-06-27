<script lang="ts">
  import { getContext } from "svelte";
  import type { Context } from "svelte-simple-modal";
  import AddTaskForm from "../forms/AddTaskForm.svelte";
  import RemoveTasksForm from "../forms/RemoveTasksForm.svelte";
  import { Filter } from "../../lib/enum/filter";
  import { fetchTasks, setCurrentFilter, currentFilter } from "../../stores/taskStore";
  import { navigate } from "svelte-routing";
  import { clearSessionStorage } from "../../util/helpers/sessionStorageHandler";
  import { Icon } from "svelte-icons-pack";
  import { AiFillSetting } from "svelte-icons-pack/ai";
  import Settings from "./Settings.svelte";

  const { open } = getContext<Context>("simple-modal");
  const showModalAdd = () => open(AddTaskForm);
  const showModalDel = () => open(RemoveTasksForm);
  const showModalSettings = () => open(Settings);

  const handleClick = (filter: Filter) => {
    fetchTasks(filter);
    setCurrentFilter(filter);
  };

  const handleLogout = () => {
    clearSessionStorage();
    navigate("/");
  };
</script>

<div class="internal-nav">
  <div class="upper">
    <div>
      <ul>
        <li>
          <button
            class="option"
            class:active={$currentFilter === Filter.ALL}
            on:click={() => handleClick(Filter.ALL)}>Wszystkie</button
          >
        </li>
        <li>
          <button
            class="option"
            class:active={$currentFilter === Filter.DONE}
            on:click={() => handleClick(Filter.DONE)}>Wykonane</button
          >
        </li>
        <li>
          <button
            class="option"
            class:active={$currentFilter === Filter.PENDING}
            on:click={() => handleClick(Filter.PENDING)}>Oczekujące</button
          >
        </li>
        <li>
          <button
            class="option"
            class:active={$currentFilter === Filter.OUTDATED}
            on:click={() => handleClick(Filter.OUTDATED)}>Przeterminowane</button
          >
        </li>
      </ul>
    </div>
    <div>
      <button on:click|preventDefault={showModalSettings}>
        <Icon src={AiFillSetting}></Icon>
      </button>
      <button class="logout" on:click={() => handleLogout()}>Wyloguj</button>
    </div>
  </div>
  <div class="action-btns">
    <button on:click={showModalAdd}>Dodaj</button>
    <button on:click={showModalDel}>Usuń</button>
  </div>
</div>

<style>
  .internal-nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 3vh;
  }

  ul {
    display: flex;
    flex-direction: row;
    gap: 3vw;

    list-style-type: none;
  }

  li {
    cursor: pointer;

    transition: color 0.2s ease;
  }

  .action-btns {
    display: flex;
    gap: 1vw;
  }

  .option {
    all: unset;
  }

  .option.active {
    font-weight: bold;
    color: rgb(85, 85, 85);
    position: relative;
  }

  .option.active::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: rgb(221, 144, 0);
  }

  .upper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .logout {
    background-color: rgb(160, 59, 255);
    color: white;
  }
</style>

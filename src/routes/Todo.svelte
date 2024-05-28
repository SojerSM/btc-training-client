<script lang="ts">
  import Selector from "./actions/Selector.svelte";
  import TaskList from "./tasks/TaskList.svelte";
  import { Modal } from "svelte-simple-modal";
  import { onMount } from "svelte";
  import { readSessionValue } from "../util/helpers/sessionStorageHandler";
  import { navigate } from "svelte-routing";
  import { sendHttpRequest } from "../util/helpers/httpRestHandler";
  import { API_URL } from "../util/global";

  onMount(async () => {
    const token: string | null = readSessionValue("jwt");

    const data = await sendHttpRequest(API_URL.concat("/auth/checkAuth"), {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!token || data === null) {
      navigate("/");
    }
  });
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

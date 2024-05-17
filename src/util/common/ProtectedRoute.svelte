<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { readSessionValue } from "../helpers/sessionStorageHandler";
  import { Route } from "svelte-routing";

  export let path: string;
  export let component: any;

  let isAuthenticated: boolean = false;

  onMount(() => {
    console.log(readSessionValue("accessToken"));
    if (readSessionValue("accessToken") === null) {
      isAuthenticated = false;
      navigate("/");
    } else {
      isAuthenticated = true;
    }
  });
</script>

{#if isAuthenticated}
  <Route {path} {component} />
{/if}

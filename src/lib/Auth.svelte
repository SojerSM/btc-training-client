<script>
  import { navigate } from "svelte-routing";

  const onSubmit = () => {
    navigate("/todo", { replace: true });
  };
</script>

<div>
  Login page
  <button on:click={onSubmit}> Sign in </button>
</div>

<style>
</style>

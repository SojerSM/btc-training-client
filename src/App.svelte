<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Auth from "./routes/Auth.svelte";
  import Todo from "./routes/Todo.svelte";
  import { Toaster } from "svelte-french-toast";

  export let url: string = "";
</script>

<Router {url}>
  <Toaster />
  <main>
    <Route path="/" component={Auth} />
    <Route path="/todo" component={Todo} />
  </main>
</Router>

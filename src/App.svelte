<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Auth from "./routes/Auth.svelte";
  import Todo from "./routes/Todo.svelte";
  import { Toaster } from "svelte-french-toast";
  import Register from "./routes/Register.svelte";

  export let url: string = "";
</script>

<Router {url}>
  <Toaster />
  <main>
    <Route path="/" component={Auth} />
    <Route path="/todo" component={Todo} />
    <Route path="/register" component={Register} />
  </main>
</Router>

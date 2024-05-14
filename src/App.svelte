<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Auth from "./lib/Auth.svelte";
  import Todo from "./lib/Todo.svelte";

  export let url: string = "";
</script>

<Router {url}>
  <div>
    <Route path="/" component={Auth} />
    <Route path="/todo" component={Todo} />
  </div>
</Router>

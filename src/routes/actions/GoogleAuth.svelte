<script>
  import { onMount } from "svelte";
  import { G_CLIENT_ID } from "../../util/global";

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // Handle the ID token here
  };

  onMount(() => {
    google.accounts.id.initialize({
      client_id: G_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("g_id_signin"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  });
</script>

<div
  id="g_id_onload"
  data-client_id={G_CLIENT_ID}
  data-callback="handleCredentialResponse"
></div>
<div id="g_id_signin"></div>

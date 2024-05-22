<script lang="ts">
  import { onMount } from "svelte";
  import { G_CLIENT_ID } from "../../util/global";
  import { API_URL } from "../../util/global";
  import { writeSessionValue } from "../../util/helpers/sessionStorageHandler";
  import { navigate } from "svelte-routing";

  const provider: String = "GOOGLE";

  let googleButton: HTMLDivElement;
  let requestSuccess: boolean = true;
  let badResponseMsg: string = "";

  const handleCredentialResponse = async (response: any) => {
    const verificationResponse = await fetch(
      API_URL.concat(`/auth/verifyWithProvider?provider=${provider}`),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: response.credential,
        },
      }
    );

    if (verificationResponse.status == 200) {
      const data = await verificationResponse.json();
      writeSessionValue("jwt", data.accessToken);
      writeSessionValue("accountId", data.accountId);
      navigate("/todo", { replace: true });
    } else if (verificationResponse.status === 403) {
      requestSuccess = false;
      badResponseMsg = "Logowanie przez konto Google niedostępne.";
    }
  };

  onMount(() => {
    google.accounts.id.initialize({
      client_id: G_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(googleButton, {
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
<div id="g_id_signin" bind:this={googleButton}></div>
{#if !requestSuccess}
  <p>{badResponseMsg}</p>
{/if}

<style>
  p {
    font-size: 0.9rem;
    color: red;
  }
</style>

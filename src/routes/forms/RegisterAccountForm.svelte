<script lang="ts">
  import { API_URL } from "../../util/global";
  import { Input } from "@svelteuidev/core";
  import type { RegisterRequestDTO } from "../../lib/dto/registerRequestDTO";
  import { sendHttpRequest } from "../../util/helpers/httpRestHandler";
  import { writeSessionValue } from "../../util/helpers/sessionStorageHandler";
  import { navigate } from "svelte-routing";
  import TfaQrSetup from "./TfaQrSetup.svelte";

  let username: string;
  let password: string;
  let email: string;
  let tfaEnabled: boolean = false;
  let displayQrSetup: boolean = false;
  let data: any;

  const handleRegister = async () => {
    const request: RegisterRequestDTO = {
      username,
      password,
      email,
      tfaEnabled,
    };

    try {
      const result = await sendHttpRequest(API_URL.concat("/auth/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (tfaEnabled === false) {
        displayQrSetup = false;
        writeSessionValue("jwt", result.accessToken);
        writeSessionValue("accountId", result.accountId);
        navigate("/todo", { replace: true });
      } else {
        displayQrSetup = true;
        data = result;
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      clearInputs();
    }
  };

  function clearInputs() {
    username = "";
    password = "";
    email = "";
    tfaEnabled = false;
  }
</script>

<div>
  {#if !displayQrSetup}
    <h2>Rejestracja</h2>
    <form on:submit|preventDefault={handleRegister}>
      <Input id="username" bind:value={username} placeholder="nazwa użytkownika" />
      <Input id="pwd" bind:value={password} type="password" placeholder="hasło" />
      <Input id="email" bind:value={email} placeholder="e-mail" />
      <div class="tfa-wrapper">
        <label for="tfa-checkbox">TFA</label>
        <input id="tfa-checkbox" type="checkbox" bind:checked={tfaEnabled} />
      </div>
      <button type="button" on:click={handleRegister}>Stwórz konto</button>
    </form>
  {:else}
    <TfaQrSetup {data} {username} />
  {/if}
</div>

<style>
  div {
    width: 20rem;
    background-color: white;
    padding: 1rem;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  h2 {
    align-self: center;
    color: black;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .tfa-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>

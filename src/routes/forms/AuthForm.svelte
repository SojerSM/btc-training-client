<script lang="ts">
  import { navigate } from "svelte-routing";
  import type { AuthRequestDTO } from "../../lib/dto/authRequestDTO";
  import { API_URL } from "../../util/global";
  import { writeSessionValue } from "../../util/helpers/sessionStorageHandler";
  import GoogleAuthButton from "../actions/GoogleAuth.svelte";
  import { Input } from "@svelteuidev/core";
  import TfaQrAuthVerification from "./TfaQrAuthVerification.svelte";

  let username: string = "";
  let password: string = "";
  let requestSuccess: boolean = true;
  let displayQrVerification: boolean = false;

  const authorize = async () => {
    const request: AuthRequestDTO = {
      username,
      password,
    };

    try {
      const response = await fetch(API_URL.concat("/auth/authenticate"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (response.status != 200) {
        requestSuccess = false;
      } else {
        const data = await response.json();

        console.log(data);

        if (data.tfaEnabled === false) {
          requestSuccess = true;
          writeSessionValue("jwt", data.accessToken);
          writeSessionValue("accountId", data.accountId);
          navigate("/todo", { replace: true });
        } else {
          displayQrVerification = true;
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  function redirectRegister() {
    navigate("/register", { replace: true });
  }
</script>

<div class="auth-wrapper">
  {#if !displayQrVerification}
    <h2>Logowanie</h2>
    <form on:submit|preventDefault={authorize}>
      <Input bind:value={username} placeholder="nazwa użytkownika" />
      <Input type="password" bind:value={password} placeholder="hasło" />
      <button on:click|preventDefault={authorize}> Zaloguj </button>
      <span>lub</span>
      <GoogleAuthButton />
    </form>
    {#if !requestSuccess}
      <p>Nie znaleziono użytkownika</p>
    {/if}
  {:else}
    <TfaQrAuthVerification {username} />
  {/if}
</div>
{#if !displayQrVerification}
  <div class="register-redirect">
    <p class="redirect-label">Nie posiadasz konta?</p>
    <button on:click|preventDefault={() => redirectRegister()}>Zarejestruj</button>
  </div>
{/if}

<style>
  .auth-wrapper {
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

  p {
    color: red;
  }

  span {
    font-size: 0.8rem;
  }

  button {
    background-color: rgb(160, 59, 255);
    color: white;
  }

  .register-redirect {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .register-redirect > p {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: gray;
  }

  .register-redirect > button {
    background-color: rgb(160, 59, 255);
    color: white;
  }
</style>

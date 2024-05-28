<script lang="ts">
  import { navigate } from "svelte-routing";
  import type { AuthRequestDTO } from "../../lib/dto/authRequestDTO";
  import { API_URL } from "../../util/global";
  import { writeSessionValue } from "../../util/helpers/sessionStorageHandler";
  import GoogleAuthButton from "../actions/GoogleAuth.svelte";
  import { Input } from "@svelteuidev/core";
  import { sendHttpRequest } from "../../util/helpers/httpRestHandler";

  let username: string = "";
  let password: string = "";
  let requestSuccess: boolean = true;

  const authorize = async () => {
    const request: AuthRequestDTO = {
      username,
      password,
    };

    try {
      const result = await sendHttpRequest(
        API_URL.concat("/auth/authenticate"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );

      const [response, data] = result;

      if (response.status != 200) {
        requestSuccess = false;
      } else {
        const data = await response.json();

        requestSuccess = true;
        writeSessionValue("jwt", data.accessToken);
        writeSessionValue("accountId", data.accountId);
        navigate("/todo", { replace: true });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
</script>

<div>
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
</style>

<script lang="ts">
  import { navigate } from "svelte-routing";
  import { sendHttpRequest } from "../../util/helpers/httpRestHandler";
  import type { AuthRequestDTO } from "../../lib/dto/authRequestDTO";
  import { API_URL } from "../../util/global";
  import { writeSessionValue } from "../../util/helpers/sessionStorageHandler";

  let username: string = "";
  let password: string = "";
  let requestSuccess: boolean = true;

  const authorize = async () => {
    const request: AuthRequestDTO = {
      username,
      password,
    };

    try {
      const response = await fetch(API_URL.concat("/auth/authenticate"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (response.status != 200) {
        requestSuccess = false;
      } else {
        const data = await response.json();

        requestSuccess = true;
        writeSessionValue("jwt", data.accessToken);
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
    <input type="text" placeholder="login" bind:value={username} />
    <input type="password" placeholder="hasło" bind:value={password} />
    <button on:click|preventDefault={authorize}> Sign in </button>
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

  input {
    border: 1px solid lightgray;
    outline: none;
    padding: 0.25rem;
    width: 100%;
    border-radius: 5px;
  }

  p {
    color: red;
  }
</style>

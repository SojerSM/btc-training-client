<script lang="ts">
  import { API_URL } from "../../util/global";
  import type { VerifyQrRequestDTO } from "../../lib/dto/verifyQrRequestDTO";
  import toast from "svelte-french-toast";
  import { writeSessionValue } from "../../util/helpers/sessionStorageHandler";
  import { navigate } from "svelte-routing";

  export let username;

  let qrCode: string;

  const handleVerify = async () => {
    const request: VerifyQrRequestDTO = {
      username,
      code: qrCode,
    };

    try {
      const response = await fetch(API_URL.concat("/auth/verifyQr"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (response.status !== 200) {
        toast.error("Niepoprawny kod weryfikacyjny.", {
          position: "bottom-center",
        });
        return;
      } else {
        const json = await response.json();

        toast.success("Zweryfikowano poprawnie.", {
          position: "bottom-center",
        });
        writeSessionValue("jwt", json.body.accessToken);
        writeSessionValue("accountId", json.body.accountId);
        navigate("/todo", { replace: true });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
</script>

<div class="input-wrapper">
  <input id="qr_code" bind:value={qrCode} placeholder="6-cio cyfrowy kod" />
</div>
<button class="verify-btn" on:click|preventDefault={handleVerify}>Zweryfikuj</button>

<style>
  .input-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  #qr_code {
    width: 85%;
    border-radius: 10px;
    outline: none;
    border: 1px solid gray;
    padding: 0.25rem 0.5rem;
    font-size: 1.2rem;
    text-align: center;
  }

  #qr_code::placeholder {
    color: rgb(202, 202, 202);
    font-style: italic;
  }

  .verify-btn {
    width: 90%;
    background-color: rgb(160, 59, 255);
    color: white;
  }
</style>

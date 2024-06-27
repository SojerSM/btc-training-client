<script lang="ts">
  import { onMount } from "svelte";
  import { API_URL } from "../../util/global";
  import { readSessionValue } from "../../util/helpers/sessionStorageHandler";
  import toast from "svelte-french-toast";
  import TfaQrSetup from "../forms/TfaQrSetup.svelte";
  import SHA1 from "crypto-js/sha1";

  let tfaEnabled: boolean;
  let imageQr: string;
  let id: string | null = readSessionValue("accountId");
  let secret: string;
  let hasSecret: boolean = false;

  onMount(async () => {
    const response = await fetch(API_URL.concat(`/auth/${id}/tfa`), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${readSessionValue("jwt")}`,
      },
    });

    if (response.status !== 200) {
      console.error("Something went wrong.");
      return;
    }

    const data = await response.json();
    tfaEnabled = data.tfaEnabled;
    hasSecret = data.hasSecret;
  });

  const toggleTfa = async () => {
    if (tfaEnabled) {
      const response = await fetch(API_URL.concat(`/auth/generateQr`), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${readSessionValue("jwt")}`,
        },
      });

      const json = await response.json();
      imageQr = json.secretImageUri;
      secret = json.secret;
    } else {
      const response = await fetch(API_URL.concat(`/auth/${id}/tfa`), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${readSessionValue("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tfaEnabled),
      });

      if (response.status !== 200) {
        toast.error("Something went wrong.", {
          position: "bottom-center",
        });
      } else {
        hasSecret = false;
      }
    }
  };

  const handleGenerateQr = async () => {
    isQrGenerated = !isQrGenerated;

    const response = await fetch(API_URL.concat(`/auth/${id}/tfa`), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${readSessionValue("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tfaEnabled),
    });

    if (response.status !== 200) {
      toast.error("Something went wrong.", {
        position: "bottom-center",
      });
    }

    const json = await response.json();
    if ("secretImageUri" in json) {
      imageQr = json.secretImageUri;
    }
  };
</script>

<div class="modal-wrapper">
  <h2>Ustawienia</h2>
  <div class="content">
    <p>Weryfikacja dwuskładnikowa</p>
    <input type="checkbox" bind:checked={tfaEnabled} on:change={toggleTfa} />
  </div>
  {#if tfaEnabled && !hasSecret}
    <div class="qr-setup">
      <TfaQrSetup data={{ secretImageUri: imageQr, secret: secret }} />
    </div>
  {/if}
</div>

<style>
  h2 {
    margin-bottom: 1rem;
  }

  .modal-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .qr-setup {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>

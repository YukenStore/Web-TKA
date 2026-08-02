<script lang="ts">
  let { data }= $props();
</script>

{#if data.testing.length === 0}
  <p>Data kosong</p>
{:else}
  <ul>
    {#each data.testing as item (item.id)}
      <li>{item.name}-{item.created_at}</li>
    {/each}
  </ul>
{/if}

<a href="/siswa-pintar">login cuy</a>
<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<main style="padding: 2rem; font-family: sans-serif;">
    <h2>Dashboard Admin: Status User</h2>

    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
        <thead>
            <tr style="background-color: #f3f4f6; text-align: left;">
                <th style="padding: 0.75rem; border: 1px solid #ddd;">Profil</th>
                <th style="padding: 0.75rem; border: 1px solid #ddd;">Nama</th>
                <th style="padding: 0.75rem; border: 1px solid #ddd;">Status</th>
                <th style="padding: 0.75rem; border: 1px solid #ddd;">Terakhir Aktif</th>
            </tr>
        </thead>
        <tbody>
            <!-- Svelte 5 Best Practice: Menggunakan (user.email) sebagai Primary Key -->
            {#each data.users as user (user.email)}
                <tr>
                    <td style="padding: 0.75rem; border: 1px solid #ddd;">
                        <img src={user.picture} width="40" alt="foto" style="border-radius: 50%;">
                    </td>
                    <td style="padding: 0.75rem; border: 1px solid #ddd;">
                        <strong>{user.name}</strong> <br>
                        <small style="color: gray;">{user.email}</small>
                    </td>
                    <td style="padding: 0.75rem; border: 1px solid #ddd;">
                        {#if user.isOnline}
                            <span style="color: green; font-weight: bold;">🟢 Online</span>
                        {:else}
                            <span style="color: gray;">⚪ Offline</span>
                        {/if}
                    </td>
                    <td style="padding: 0.75rem; border: 1px solid #ddd;">
                        {new Date(user.last_active).toLocaleString('id-ID')}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>
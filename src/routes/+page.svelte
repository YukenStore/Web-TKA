<script lang="ts">
    import { onMount } from 'svelte';
    import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    let user = $derived(data.user);

    async function handleCredentialResponse(response: any) {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: response.credential })
        });

        if (res.ok) {
            const data = await res.json();
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            } else {
                window.location.reload();
            }
        }
    }

    async function logout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.reload();
    }

    function initGoogle() {
        if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
            (window as any).google.accounts.id.initialize({
                client_id: PUBLIC_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse
            });

            const buttonDiv = document.getElementById('google-signin-btn');
            if (buttonDiv) {
                (window as any).google.accounts.id.renderButton(buttonDiv, {
                    type: 'standard',
                    shape: 'rectangular',
                    theme: 'outline',
                    text: 'signin_with',
                    size: 'large',
                    logo_alignment: 'center'
                });
            }
        }
    }

    onMount(() => {
        (window as any).handleCredentialResponse = handleCredentialResponse;
        
        if ((window as any).google?.accounts?.id) {
            initGoogle();
        } else {
            const timer = setInterval(() => {
                if ((window as any).google?.accounts?.id) {
                    clearInterval(timer);
                    initGoogle();
                }
            }, 50);
        }
    });
</script>

<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<main style="padding: 2rem; font-family: sans-serif; text-align: center;">
    {#if user}
        <div style="border: 1px solid #ccc; padding: 2rem; display: inline-block; border-radius: 8px;">
            <img src={user.picture} alt="Profil" style="border-radius: 50%; width: 100px; height: 100px; margin-bottom: 1rem;" />
            <h2>Halo, {user.name}!</h2>
            <p>{user.email}</p>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center;">
                <a href="/{user.slug}" style="padding: 0.5rem 1rem; background-color: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-weight: bold;">Ke Dashboard Slug (/user/{user.slug})</a>
                <button onclick={logout} style="padding: 0.5rem 1rem; cursor: pointer; border-radius: 6px;">Logout</button>
            </div>
        </div>
    {:else}
        <h2>Silakan Login</h2>
        
        <div style="display: flex; justify-content: center; margin-top: 1.5rem;">
            <div id="google-signin-btn"></div>
        </div>
    {/if}
</main>

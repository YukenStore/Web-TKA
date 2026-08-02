<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { data } = $props();
	const slug = data.slug;
	// Convert slug to display name (e.g. "siswa-pintar" → "Siswa Pintar")
	const userName = slug
		.split('-')
		.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	let activeTab = $state<'tryout' | 'riwayat'>('tryout');

	// Dummy data for tryout cards
	const tryoutCards = [
		{ id: 1, judul: 'Tryout TKA Episode #1', tanggal: '10 Agustus 2026', waktu: '90 Menit' },
		{ id: 2, judul: 'Tryout TKA Episode #2', tanggal: '12 Agustus 2026', waktu: '90 Menit' },
		{ id: 3, judul: 'Tryout TKA Episode #3', tanggal: '15 Agustus 2026', waktu: '60 Menit' },
		{ id: 4, judul: 'Tryout Literasi Bahasa', tanggal: '18 Agustus 2026', waktu: '45 Menit' },
		{ id: 5, judul: 'Tryout Penalaran Matematika', tanggal: '20 Agustus 2026', waktu: '60 Menit' }
	];

	const riwayatCards = [
		{ id: 1, judul: 'Tryout UTBK Saintek #0', tanggal: '1 Agustus 2026', waktu: '90 Menit' },
		{ id: 2, judul: 'Tryout TPS Dasar', tanggal: '28 Juli 2026', waktu: '60 Menit' }
	];

	let kuotaPremium = $state(5);
	let jenjang = $state('SD');
	let isProfileOpen = $state(false);

	function toggleProfile(e: Event) {
		e.stopPropagation();
		isProfileOpen = !isProfileOpen;
	}

	function handleLogout() {
		window.location.href = '/';
	}
	
	function closeProfile(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (isProfileOpen && !target.closest('.header-right')) {
			isProfileOpen = false;
		}
	}

	let cards = $derived(activeTab === 'tryout' ? tryoutCards : riwayatCards);
</script>

<svelte:head>
	<title>Dashboard - TKA</title>
	<meta name="description" content="Dashboard pengguna TKA - Akses tryout dan riwayat tryout Anda" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<svelte:window onclick={closeProfile} />

<div class="dashboard-page">
	<!-- Header -->
	<header class="dash-header" id="dash-header">
		<div class="header-left">
			<div class="brand-container" id="brand-container">
				<img src={favicon} alt="TKA Logo" class="logo-icon" />
				<div class="brand-text">
					<span class="brand-title">LKP</span>
					<span class="brand-subtitle">INSAN JAYA</span>
				</div>
			</div>
		</div>
		<div class="header-right">
			<button class="profile-btn" id="profile-btn" onclick={toggleProfile} aria-label="Profil Pengguna">
				<svg class="profile-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
				</svg>
			</button>

			{#if isProfileOpen}
				<div class="profile-dropdown" style="position: absolute; top: calc(100% + 10px); right: 0;">
					<div class="profile-info">
						<div class="profile-avatar">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
							</svg>
						</div>
						<div class="profile-details">
							<span class="profile-name">{userName}</span>
							<span class="profile-role">Peserta Tryout</span>
						</div>
					</div>
					<div class="dropdown-divider"></div>
					<button class="logout-btn" onclick={handleLogout}>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
						</svg>
						<span>Keluar</span>
					</button>
				</div>
			{/if}
		</div>
	</header>

	<!-- Main Content -->
	<main class="dash-main" id="dash-main">
		<!-- Banner -->
		<div class="banner" id="dash-banner">
			<div class="banner-overlay"></div>
			<div class="banner-content">
				<h1 class="banner-title">Selamat Datang, {userName}! 🎓</h1>
				<p class="banner-subtitle">Raih skor terbaikmu dengan latihan tryout berkualitas</p>
			</div>
			<div class="banner-shapes">
				<div class="shape shape-1"></div>
				<div class="shape shape-2"></div>
				<div class="shape shape-3"></div>
			</div>
		</div>

		<!-- Tabs -->
		<nav class="tabs-nav" id="tabs-nav">
			<button
				class="tab-btn {activeTab === 'tryout' ? 'active' : ''}"
				id="tab-tryout"
				onclick={() => (activeTab = 'tryout')}
			>
				Tryout
			</button>
			<button
				class="tab-btn {activeTab === 'riwayat' ? 'active' : ''}"
				id="tab-riwayat"
				onclick={() => (activeTab = 'riwayat')}
			>
				Riwayat Tryout
			</button>
		</nav>

		<!-- Info Bar -->
		<div class="info-bar" id="info-bar">
			<div class="kuota-info">
				<span class="kuota-label">Kuota premium saya :</span>
				<span class="kuota-count">{kuotaPremium}</span>
				<button class="beli-btn" id="beli-kuota-btn">Beli Kuota</button>
			</div>
			<div class="jenjang-wrapper">
				<select class="jenjang-select" id="jenjang-select" bind:value={jenjang}>
					<option value="SD">SD</option>
				</select>
				<svg class="select-arrow" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
				</svg>
			</div>
		</div>

		<!-- Cards -->
		<div class="cards-section" id="cards-section">
			<div class="cards-scroll">
				{#each cards as card (card.id)}
					<div class="tryout-card" id="tryout-card-{card.id}">
						<div class="card-accent"></div>
						<div class="card-body">
							<h3 class="card-title">{card.judul}</h3>
							<div class="card-meta">
								<div class="meta-item">
									<svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
									</svg>
									<span>{card.tanggal}</span>
								</div>
								<div class="meta-item">
									<svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
									</svg>
									<span>{card.waktu}</span>
								</div>
							</div>
						</div>
						<button class="card-btn" id="start-tryout-{card.id}">
							{activeTab === 'tryout' ? 'Mulai Tryout' : 'Lihat Hasil'}
							<svg class="btn-arrow" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
							</svg>
						</button>
					</div>
				{/each}
			</div>
		</div>
	</main>
</div>

<style>
	/* ===== CSS Custom Properties (Light Mode Default) ===== */
	.dashboard-page {
		--bg-page: #f5f5f7;
		--bg-header: rgba(255, 255, 255, 0.85);
		--border-header: rgba(0, 0, 0, 0.06);
		--text-primary: #1c1c1e;
		--text-secondary: #6b7280;
		--text-muted: #9ca3af;
		--bg-surface: rgba(255, 255, 255, 0.8);
		--border-surface: rgba(0, 0, 0, 0.08);
		--bg-tabs: rgba(0, 0, 0, 0.04);
		--tab-hover: #1c1c1e;
		--tab-active-bg: rgba(99, 102, 241, 0.1);
		--tab-active-color: #6366f1;
		--tab-active-border: rgba(99, 102, 241, 0.2);
		--kuota-color: #6366f1;
		--kuota-bg: rgba(99, 102, 241, 0.08);
		--select-border: rgba(0, 0, 0, 0.12);
		--select-bg: rgba(255, 255, 255, 0.9);
		--select-color: #1c1c1e;
		--select-option-bg: #ffffff;
		--select-option-color: #1c1c1e;
		--card-bg: rgba(255, 255, 255, 0.9);
		--card-border: rgba(0, 0, 0, 0.06);
		--card-hover-border: rgba(99, 102, 241, 0.3);
		--card-hover-shadow: rgba(99, 102, 241, 0.1);
		--card-title-color: #1c1c1e;
		--meta-color: #6b7280;
		--scrollbar-color: rgba(99, 102, 241, 0.25);
		--arrow-color: #9ca3af;
	}



	/* ===== Base ===== */
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	.dashboard-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--bg-page);
		color: var(--text-primary);
		transition: background 0.3s ease, color 0.3s ease;
	}

	/* ===== Header ===== */
	.dash-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		background: var(--bg-header);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--border-header);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-left {
		display: flex;
		align-items: center;
	}

	.brand-container {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.logo-icon {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: transparent;
		padding: 2px;
	}

	.brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
		gap: 0.1rem;
	}

	.brand-title {
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--text-primary);
		letter-spacing: 0.02em;
	}

	.brand-subtitle {
		font-size: 1.05rem;
		font-weight: 700;
		color: #7c3aed;
		letter-spacing: 0.02em;
	}

	.header-right {
		display: flex;
		align-items: center;
		position: relative;
	}

	.profile-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		border-radius: 50%;
		border: none;
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		color: white;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 12px rgba(99, 102, 241, 0.3);
	}

	.profile-btn:hover {
		transform: scale(1.1);
		box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);
	}

	.profile-icon {
		width: 22px;
		height: 22px;
	}

	/* ===== Profile Dropdown ===== */
	:global(.profile-dropdown) {
		background: var(--bg-surface);
		border: 1px solid var(--border-surface);
		border-radius: 16px;
		padding: 0.5rem;
		min-width: 200px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		animation: dropdownFadeIn 0.2s ease;
		z-index: 110;
	}

	@keyframes dropdownFadeIn {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	:global(.profile-info) {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
	}

	:global(.profile-avatar) {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: rgba(99, 102, 241, 0.1);
		color: #6366f1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.profile-details) {
		display: flex;
		flex-direction: column;
	}

	:global(.profile-name) {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	:global(.profile-role) {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	:global(.dropdown-divider) {
		height: 1px;
		background: var(--border-surface);
		margin: 0.5rem 0;
	}

	:global(.logout-btn) {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.75rem;
		border: none;
		background: transparent;
		color: #ef4444;
		font-size: 0.85rem;
		font-weight: 600;
		font-family: inherit;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
	}

	:global(.logout-btn:hover) {
		background: rgba(239, 68, 68, 0.1);
	}

	/* ===== Main Content ===== */
	.dash-main {
		flex: 1;
		padding: 1.5rem;
		max-width: 960px;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	/* ===== Banner ===== */
	.banner {
		position: relative;
		border-radius: 20px;
		padding: 2.5rem 2rem;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #a78bfa 100%);
		overflow: hidden;
		margin-bottom: 2rem;
		box-shadow: 0 8px 32px rgba(99, 102, 241, 0.25);
	}

	.banner-overlay {
		position: absolute;
		inset: 0;
		background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	}

	.banner-content {
		position: relative;
		z-index: 2;
	}

	.banner-title {
		font-size: 1.75rem;
		font-weight: 800;
		color: white;
		margin: 0 0 0.5rem;
		letter-spacing: -0.02em;
	}

	.banner-subtitle {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.85);
		margin: 0;
		font-weight: 400;
	}

	.banner-shapes {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 1;
	}

	.shape {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.08);
	}

	.shape-1 {
		width: 120px;
		height: 120px;
		top: -30px;
		right: -20px;
		animation: float 6s ease-in-out infinite;
	}

	.shape-2 {
		width: 80px;
		height: 80px;
		bottom: -20px;
		right: 60px;
		animation: float 8s ease-in-out infinite reverse;
	}

	.shape-3 {
		width: 60px;
		height: 60px;
		top: 10px;
		right: 140px;
		animation: float 7s ease-in-out infinite 1s;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0) scale(1); }
		50% { transform: translateY(-12px) scale(1.05); }
	}

	/* ===== Tabs ===== */
	.tabs-nav {
		display: flex;
		gap: 0.25rem;
		margin-bottom: 1.25rem;
		background: var(--bg-tabs);
		border-radius: 14px;
		padding: 4px;
		width: fit-content;
	}

	.tab-btn {
		padding: 0.65rem 1.5rem;
		border: none;
		background: transparent;
		color: var(--text-secondary);
		font-size: 0.9rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		border-radius: 11px;
		transition: all 0.25s ease;
		position: relative;
	}

	.tab-btn:hover {
		color: var(--tab-hover);
	}

	.tab-btn.active {
		background: var(--tab-active-bg);
		color: var(--tab-active-color);
		box-shadow: 0 0 0 1px var(--tab-active-border);
	}

	/* ===== Info Bar ===== */
	.info-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding: 1rem 1.25rem;
		background: var(--bg-surface);
		border: 1px solid var(--border-surface);
		border-radius: 16px;
	}

	.kuota-info {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.kuota-label {
		font-size: 0.9rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.kuota-count {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--kuota-color);
		background: var(--kuota-bg);
		padding: 0.15rem 0.65rem;
		border-radius: 8px;
		min-width: 28px;
		text-align: center;
	}

	.beli-btn {
		padding: 0.5rem 1.15rem;
		border: none;
		background: linear-gradient(135deg, #ef4444, #dc2626);
		color: white;
		font-size: 0.82rem;
		font-weight: 600;
		font-family: inherit;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.25s ease;
		box-shadow: 0 2px 10px rgba(239, 68, 68, 0.3);
	}

	.beli-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 16px rgba(239, 68, 68, 0.45);
	}

	.jenjang-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.jenjang-select {
		appearance: none;
		padding: 0.55rem 2.2rem 0.55rem 1rem;
		border: 1px solid var(--select-border);
		background: var(--select-bg);
		color: var(--select-color);
		font-size: 0.85rem;
		font-weight: 500;
		font-family: inherit;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.2s ease;
		outline: none;
	}

	.jenjang-select:hover {
		border-color: rgba(99, 102, 241, 0.4);
	}

	.jenjang-select:focus {
		border-color: #6366f1;
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
	}

	.jenjang-select option {
		background: var(--select-option-bg);
		color: var(--select-option-color);
	}

	.select-arrow {
		position: absolute;
		right: 0.65rem;
		width: 16px;
		height: 16px;
		color: var(--arrow-color);
		pointer-events: none;
	}

	/* ===== Cards ===== */
	.cards-section {
		margin-bottom: 2rem;
	}

	.cards-scroll {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 0.75rem;
		scrollbar-width: thin;
		scrollbar-color: var(--scrollbar-color) transparent;
	}

	.cards-scroll::-webkit-scrollbar {
		height: 6px;
	}

	.cards-scroll::-webkit-scrollbar-track {
		background: transparent;
	}

	.cards-scroll::-webkit-scrollbar-thumb {
		background: var(--scrollbar-color);
		border-radius: 3px;
	}

	.tryout-card {
		flex: 0 0 280px;
		scroll-snap-align: start;
		background: var(--card-bg);
		border: 1px solid var(--card-border);
		border-radius: 18px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: all 0.3s ease;
	}

	.tryout-card:hover {
		border-color: var(--card-hover-border);
		transform: translateY(-3px);
		box-shadow: 0 8px 30px var(--card-hover-shadow);
	}

	.card-accent {
		height: 4px;
		background: linear-gradient(90deg, #6366f1, #a78bfa, #c4b5fd);
	}

	.card-body {
		padding: 1.25rem 1.25rem 0.75rem;
		flex: 1;
	}

	.card-title {
		font-size: 1rem;
		font-weight: 700;
		color: var(--card-title-color);
		margin: 0 0 0.85rem;
		line-height: 1.3;
	}

	.card-meta {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.82rem;
		color: var(--meta-color);
	}

	.meta-icon {
		width: 15px;
		height: 15px;
		color: #6366f1;
		flex-shrink: 0;
	}

	.card-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		margin: 0.75rem 1.25rem 1.25rem;
		padding: 0.7rem 1rem;
		border: none;
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		color: white;
		font-size: 0.85rem;
		font-weight: 600;
		font-family: inherit;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.25s ease;
		box-shadow: 0 2px 12px rgba(99, 102, 241, 0.25);
	}

	.card-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
	}

	.btn-arrow {
		width: 16px;
		height: 16px;
		transition: transform 0.2s ease;
	}

	.card-btn:hover .btn-arrow {
		transform: translateX(3px);
	}

	/* ===== Responsive ===== */
	@media (max-width: 640px) {
		.dash-header {
			padding: 0.85rem 1rem;
		}

		.dash-main {
			padding: 1rem;
		}

		.banner {
			padding: 2rem 1.25rem;
			border-radius: 16px;
		}

		.banner-title {
			font-size: 1.35rem;
		}

		.banner-subtitle {
			font-size: 0.9rem;
		}

		.info-bar {
			flex-direction: column;
			align-items: flex-start;
		}

		.tryout-card {
			flex: 0 0 250px;
		}
	}
</style>
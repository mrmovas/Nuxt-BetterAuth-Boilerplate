<script setup lang="ts">
    const config = useRuntimeConfig()
    const { user, logout } = useAuth()

    useSeoMeta({
        title: 'Home',
        ogTitle: `${config.public.appName} — Your app starts here`,
        ogUrl: config.public.appURL
    })
</script>


<template>
    <main class="flex-1 flex justify-center items-center px-5 py-16">
        <div class="max-w-[680px]">

        <!-- Badge -->
        <div class="inline-block text-[11px] tracking-widest uppercase text-[var(--color-accent)] border border-[var(--color-accent)] px-2.5 py-1 rounded-full mb-8">
            auth boilerplate
        </div>

        <!-- Headline -->
        <h1 class="font-serif leading-[1.05] mb-5" style="font-size: clamp(48px, 8vw, 80px)">
            Your app<br>
            <em class="italic text-[var(--color-accent)]">starts here.</em>
        </h1>

        <!-- Sub -->
        <p class="text-[var(--color-muted)] text-[15px] max-w-[480px] mb-10 leading-7">
            A minimal Nuxt + Better-Auth boilerplate.
            Register, verify your email, and access your profile.
        </p>

        <!-- Actions -->
        <div class="flex gap-3 flex-wrap mb-14 items-center">
            <!-- Authenticated -->
            <template v-if="user">
                <p class="text-[var(--color-muted)]">
                Welcome back, <strong class="text-[#f0f0f0]">{{ user.name?.split(' ')[0] }}</strong>
                </p>
                <NuxtLink
                    to="/profile"
                    class="cursor-pointer font-mono text-sm bg-[var(--color-accent)] text-[var(--color-bg)] font-medium rounded px-5 py-2.5 hover:opacity-85 transition-opacity no-underline"
                >
                    Go to profile →
                </NuxtLink>
                <button
                    class="cursor-pointer font-mono text-sm bg-transparent text-[#f0f0f0] border border-[var(--color-border)] rounded px-5 py-2.5 hover:border-[#f0f0f0] transition-colors"
                    @click="logout"
                >
                    Logout
                </button>
            </template>

            <!-- Guest -->
            <template v-else>
                <NuxtLink
                    to="/auth?tab=register"
                    class="cursor-pointer font-mono text-sm bg-[var(--color-accent)] text-[var(--color-bg)] font-medium rounded px-5 py-2.5 hover:opacity-85 transition-opacity no-underline"
                >
                    Get started →
                </NuxtLink>
                <NuxtLink
                    to="/auth"
                    class="cursor-pointer font-mono text-sm bg-transparent text-[#f0f0f0] border border-[var(--color-border)] rounded px-5 py-2.5 hover:border-[#f0f0f0] transition-colors no-underline"
                >
                    Login
                </NuxtLink>
          </template>
        </div>

        <!-- Frontend Stack -->
        <div class="text-[var(--color-muted)] text-xs mb-4">
            <a href="https://github.com/mrmovas/Nuxt-BetterAuth-Boilerplate" target="_blank" class="text-[var(--color-accent)] hover:opacity-85 transition-opacity">
                Frontend
            </a>
            · <span>Nuxt</span> · <span>Tailwind</span> · <span>Better-Auth's Client</span> · <span>TypeScript</span>
        </div>

        <!-- Backend Stack -->
        <div class="text-[var(--color-muted)] text-xs">
            <a href="https://github.com/mrmovas/express-betterauth-boilerplate" target="_blank" class="text-[var(--color-accent)] hover:opacity-85 transition-opacity">
                Backend
            </a>
            · <span>Express</span> · <span>Better-Auth</span> · <span>PostgreSQL</span> · <span>Prisma</span>
        </div>
      </div>
    </main>
</template>
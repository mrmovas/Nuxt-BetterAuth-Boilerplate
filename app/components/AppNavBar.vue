<script setup lang="ts">

    const { user, isPending, logout } = useAuth()

</script>



<template>
    <nav class="flex justify-between items-center px-10 py-5 border-b border-[var(--color-border)]">
        <NuxtLink to="/" class="font-serif text-xl text-[#f0f0f0] no-underline">auth.</NuxtLink>

        <div class="flex items-center gap-5">
            <template v-if="!isPending && user">
                <NuxtLink 
                    to="/profile"
                    class="text-[var(--color-accent)] no-underline hover:underline"
                >
                    {{ user.name?.split(' ')[0] }}
                </NuxtLink>
                <button 
                    class="cursor-pointer font-mono text-sm bg-transparent text-[#f0f0f0] border border-[var(--color-border)] rounded px-3.5 py-1.5 hover:border-[#f0f0f0] transition-colors"
                    @click="logout()"
                >
                    Logout
                </button>
            </template>


            <template v-else-if="!isPending">
                <NuxtLink 
                    to="/auth" 
                    class="text-[var(--color-accent)] no-underline hover:underline"
                >
                    Login
                </NuxtLink>
                <NuxtLink 
                    to="/auth?tab=register" 
                    class="cursor-pointer font-mono text-sm bg-transparent text-[#f0f0f0] border border-[var(--color-border)] rounded px-3.5 py-1.5 hover:border-[#f0f0f0] transition-colors no-underline"
                >
                    Register
                </NuxtLink>
            </template>
        </div>
    </nav>
</template>
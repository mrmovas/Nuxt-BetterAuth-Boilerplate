<script setup lang="ts">
const { logout } = useAuth()

defineProps<{
    profileOpen: boolean
}>()


</script>


<template>
    <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
    >
        <div
            v-if="profileOpen"
            class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 flex flex-col gap-8"
        >
            <!-- User info -->
            <ProfilePanelUserInfo />

            <!-- Divider -->
            <div class="h-px bg-[var(--color-border)]" ></div>

            <!-- Change password -->
            <ProfilePanelChangePassword />

            <!-- Divider -->
            <div class="h-px bg-[var(--color-border)]" ></div>

            <!-- Sign out -->
            <button
                class="w-full cursor-pointer font-mono text-sm bg-transparent text-[var(--color-muted)] border border-[var(--color-border)] rounded py-2.5 hover:border-[var(--color-danger)] hover:text-[var(--color-danger)] transition-colors"
                @click="logout()"
            >
                Sign out
            </button>
        </div>
    </Transition>
</template>
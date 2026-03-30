export const useCountdown = (seconds: number) => {
    const remaining = ref(0)
    const isActive = computed(() => remaining.value > 0)
    const start = () => { 
        remaining.value = seconds
        const interval = setInterval(() => {
            remaining.value -= 1
            if (remaining.value <= 0) {
                clearInterval(interval)
            }
        }, 1000)
    }
    return { remaining, isActive, start }
}
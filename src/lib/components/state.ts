import { writable } from 'svelte/store'

export let showCollider = writable(false)
export let autoRotate = writable(true)
export let playPause = writable(true)
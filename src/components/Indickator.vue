<template>
  <div>
    <svg
      class="overflow-visible transition-transform"
      viewBox="0 0 234.378 206.6457"
      :style="{ 'transform-origin': 'center bottom', transform: 'scale(var(--indickator-size))' }"
    >
      <path
        ref="indickator"
        :class="['stroke-indickator fill-none transition-colors duration-500 st0', color]"
        d="M43.2366,127.3113c54.384,0.0889,108.1335,6.0245,150.0863,40.8777"
      />
      <ellipse
        :class="['fill-indickator stroke-0 transition-colors duration-500', color]"
        cx="46.5354"
        cy="156.3307"
        rx="46.5354"
        ry="50.315"
      />
      <path
        class="opacity-20"
        d="M86.7,131c2.8,6.6,4.4,13.9,4.4,21.6c0,28.7-21.5,51.9-48,51.9c-7.1,0-13.9-1.7-20-4.7c6.9,4.3,14.9,6.9,23.4,6.9c25.7,0,46.5-22.5,46.5-50.3C93.1,147.1,90.8,138.4,86.7,131z"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import anime from 'animejs'

const props = defineProps({
  speed: Number,
  color: String,
})

const indickator = ref(null)

const DAMPING = 0.25
const MOMENTUM_DECAY = 0.01
const SPRING_STIFFNESS = 1.2
const DRIFT_COMPENSATION = 0.1
const JERK_FACTOR = 0.6

let animation = null

const normalizedSpeed = computed(() => {
  if (props.speed == null || props.speed <= 0) return 0
  return 1 / (1 + Math.pow(Math.E, -Math.log10(props.speed)) * 5)
})

let currentPosition = 0
let lastTime = null
let previousVelocity = 0
let totalDisplacement = 0
let momentum = 0

const animate = timestamp => {
  if (animation != null) {
    let deltaTime = (timestamp - lastTime) / 1000

    if (deltaTime < 0.2 && !isNaN(normalizedSpeed.value) && !isNaN(deltaTime) && deltaTime !== 0) {
      let displacement = normalizedSpeed.value - currentPosition
      let acceleration = SPRING_STIFFNESS * displacement

      acceleration += (DRIFT_COMPENSATION * totalDisplacement * deltaTime) / 2
      acceleration += (JERK_FACTOR * (displacement - previousVelocity)) / deltaTime

      momentum = (1 - MOMENTUM_DECAY) * (momentum + (acceleration * deltaTime) / DAMPING)
      currentPosition += momentum * deltaTime
      currentPosition *= 1 + 0.005 * (Math.random() - 0.5)

      animation.seek((currentPosition * (0.85 - 0.15) + 0.15) * animation.duration)

      previousVelocity = displacement
      totalDisplacement += displacement
    }
  }

  lastTime = timestamp
  requestAnimationFrame(animate)
}

onMounted(() => {
  animation = anime({
    targets: indickator.value,
    keyframes: [
      {
        d: 'M43.2366,127.3113c54.384,0.0889,96.7949,13.2871,126.6532,57.8855',
        duration: 0,
      },
      { d: 'M43.2366,127.3113c54.384,0.0889,108.1335,6.0245,150.0863,40.8777' },
      { d: 'M43.2366,127.3113c54.384,0.0889,118.1634-2.0917,164.6516,7.3571' },
      { d: 'M43.2366,127.3113c54.384,0.0889,124.1716-12.8178,162.1808-30.5554' },
      { d: 'M43.2366,127.3113c54.384,0.0889,117.9895-39.6608,146.4957-70.4294' },
      { d: 'M43.2366,127.3113c54.384,0.0889,104.796-63.0417,114.3715-103.8782' },
      { d: 'M43.2366,127.3113c54.384,0.0889,81.1733-77.4033,86.5983-118.9951' },
    ],
    easing: 'linear',
    autoplay: false,
  })

  animation.seek(0.15 * animation.duration)
  requestAnimationFrame(animate)
})
</script>

<style scoped>
.st0 {
  stroke-width: 42.5197;
  stroke-linecap: round;
}

.stroke-indickator {
  stroke: var(--color-indickator, oklch(0.91 0.09 73.95));
}

.fill-indickator {
  fill: var(--color-indickator, oklch(0.91 0.09 73.95));
}

.fill-primary {
  fill: var(--color-primary, oklch(0.71 0.14 194.06)) !important;
}

.stroke-primary {
  stroke: var(--color-primary, oklch(0.71 0.14 194.06)) !important;
}

.fill-secondary {
  fill: var(--color-secondary, oklch(0.64 0.23 353.85)) !important;
}

.stroke-secondary {
  stroke: var(--color-secondary, oklch(0.64 0.23 353.85)) !important;
}
</style>

<template>
  <div
    class="flex flex-col md:grid md:grid-cols-[minmax(200px,_4fr)_6fr] gap-8 px-4 w-full md:pt-12"
  >
    <Indickator
      :speed="currentSpeed"
      :color="
        data?.testState == 1 && currentSpeed > 0
          ? 'fill-primary stroke-primary'
          : data?.testState == 3 && currentSpeed > 0
          ? 'fill-secondary stroke-secondary'
          : ''
      "
    />
    <div class="flex flex-col items-center justify-center gap-2">
      <slot></slot>
      <div class="stats bg-base-200 shadow grid-cols-2 w-full">
        <div class="stat place-items-center text-primary w-full">
          <div class="stat-title">Download</div>
          <div class="stat-value">{{ avgDownload ? formatSpeed(avgDownload) : '-' }}</div>
          <div class="stat-actions w-full">
            <progress class="progress progress-primary w-full" :value="data?.dlProgress"></progress>
          </div>
        </div>
        <div class="stat place-items-center text-secondary w-full">
          <div class="stat-title">Upload</div>
          <div class="stat-value">{{ avgUpload ? formatSpeed(avgUpload) : '-' }}</div>
          <div class="stat-actions w-full">
            <progress
              class="progress progress-secondary w-full"
              :value="data?.ulProgress"
            ></progress>
          </div>
        </div>
      </div>
      <div class="stats bg-base-200 shadow grid-cols-2 w-full">
        <div v-if="data?.clientIp" class="stat place-items-center">
          <div class="stat-title">Ping</div>
          <div class="stat-value">
            {{ data?.clientIp ? `${data.clientIp.split(' ')[0]} ms` : '-' }}
          </div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Ping</div>
          <div class="stat-value">
            {{ data?.pingStatus ? `${Number(data.pingStatus).toFixed(0)} ms` : '-' }}
          </div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Jitter</div>
          <div class="stat-value">
            {{ data?.jitterStatus ? `${Number(data.jitterStatus).toFixed(2)} ms` : '-' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Indickator from './Indickator.vue'

const props = defineProps({
  data: Object,
})

const downloadSpeeds = ref([])
const uploadSpeeds = ref([])

watch(
  () => props.data?.dlStatus,
  newVal => {
    if (newVal) {
      downloadSpeeds.value.push(Number(newVal))
    }
  }
)

watch(
  () => props.data?.ulStatus,
  newVal => {
    if (newVal) {
      uploadSpeeds.value.push(Number(newVal))
    }
  }
)

watch(
  () => props.data?.testState,
  newVal => {
    if (newVal == 2) {
      downloadSpeeds.value = []
      uploadSpeeds.value = []
    }
  }
)

const avgDownload = computed(() => {
  if (downloadSpeeds.value.length === 0) return 0
  return downloadSpeeds.value.reduce((a, b) => a + b, 0) / downloadSpeeds.value.length
})

const avgUpload = computed(() => {
  if (uploadSpeeds.value.length === 0) return 0
  return uploadSpeeds.value.reduce((a, b) => a + b, 0) / uploadSpeeds.value.length
})

const currentSpeed = computed(() => {
  switch (props.data?.testState) {
    case 1:
      return props.data.dlStatus
    case 3:
      return props.data.ulStatus
  }
  return 0
})

function formatSpeed(speed) {
  const s = Number(speed)
  if (s < 10) return `${s.toFixed(2)} Mbps`
  if (s < 100) return `${s.toFixed(1)} Mbps`
  if (s < 1000) return `${s.toFixed(0)} Mbps`
  if (s < 10000) return `${(s / 1000).toFixed(2)} Gbps`
  if (s < 100000) return `${(s / 1000).toFixed(1)} Gbps`
  return `${(s / 1000).toFixed(0)} Gbps`
}
</script>

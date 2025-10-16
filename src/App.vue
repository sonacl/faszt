<template>
  <div>
    <h1 class="md:mt-6 mt-3 w-full text-center text-3xl md:text-5xl font-bold italic">
      {{ title }}
    </h1>
    <div class="container mx-auto md:pt-8 pt-2 flex flex-col md:items-center items-end">
      <Metrics :data="testData">
        <button
          :class="['md:hidden btn btn-lg mb-4', state === 'ready' ? 'btn-success' : 'btn-error']"
          @click="toggleTest"
        >
          {{ state === 'ready' ? 'Begin test' : 'Cancel test' }}
        </button>
      </Metrics>
      <button
        :class="[
          'md:block hidden btn btn-lg mt-4',
          state === 'ready' ? 'btn-success' : 'btn-error',
        ]"
        @click="toggleTest"
      >
        {{ state === 'ready' ? 'Begin test' : 'Cancel test' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Metrics from './components/Metrics.vue'

const title = ref(window.TITLE || 'Faszt.com')
const state = ref('ready')
const testData = ref(null)

const speedtest = new window.Speedtest()
speedtest.setParameter('getIp_ispInfo', false)

speedtest.setParameter('url_dl', '/api/download')
speedtest.setParameter('url_ul', '/api/upload')
speedtest.setParameter('url_ping', '/api/ping')
speedtest.setParameter('url_getIp', '/api/ip')

const toggleTest = () => {
  if (speedtest.getState() === 3) {
    speedtest.abort()
  } else {
    speedtest.onupdate = data => {
      testData.value = data
    }
    speedtest.onend = aborted => {
      if (aborted) {
        testData.value = null
      }
      state.value = 'ready'
    }
    speedtest.start()
    state.value = 'testing'
  }
}
</script>

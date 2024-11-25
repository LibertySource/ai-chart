<template>
  <div class="bg-winter-blue text-deep-blue">
    <div id="loadingOverlay" class="modal-overlay" v-show="loading">
      <div class="spinner"></div>
    </div>
    <div class="container mx-auto max-w-3xl p-6">
      <header class="bg-ice-blue p-6 rounded-lg mb-6">
        <h1 class="text-2xl font-bold">AI Chart v.{{ appVersion }}</h1>
      </header>
      <div class="mb-6">
        <p>
          <span class="font-bold">References</span>:
          <a class="text-blue-500 underline" href="https://www.chartjs.org/docs/latest/api/"
            target="_blank">Chart.js</a>
          and
          <a class="text-blue-500 underline" href="https://github.com/LibertySource/ai-chart" target="_blank">GitHub
            Repo</a>.
        </p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg shadow-sm mb-6 border border-gray-200">
        <h2 class="text-lg font-semibold mb-2">Directions:</h2>
        <ol class="list-decimal list-inside space-y-2">
          <li>Enter AWS access credentials in the fields below</li>
          <li>Select a sample prompt from the dropdown or enter your own</li>
          <li>Click "Generate Chart" to visualize the data</li>
          <li>The AI will analyze your request and create an appropriate chart visualization</li>
        </ol>
      </div>

      <form @submit.prevent="login">
        <HiddenInput v-model="accessKey" label="Access Key" />
        <HiddenInput v-model="accessSecretKey" label="Access Secret Key" />
      </form>

      <div class="mb-4">
        <label for="samplePrompts" class="block mb-2">Sample Prompts</label>
        <select id="samplePrompts" class="w-full p-2 border rounded" v-model="selectedSample" @change="updateJsonInput">
          <option value="">Select a sample</option>
          <option v-for="(sample, index) in samplePrompts" :key="index" :value="sample.value">{{ sample.title }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="prompt" class="block mb-2">Prompt</label>
        <textarea id="prompt" rows="5" class="w-full p-2 border rounded" v-model="prompt"></textarea>
      </div>

      <button @click="generateChart"
        class="bg-button-blue text-white p-2 rounded hover:bg-blue-700 transition duration-300">
        Generate Chart
      </button>
      <canvas ref="chartCanvas" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2';
import { BedrockAgentRuntimeClient, InvokeFlowCommand } from "@aws-sdk/client-bedrock-agent-runtime";
import HiddenInput from './components/HiddenInput.vue';
import { samplePrompts } from './sample-prompts';

const accessKey = ref<string>('');
const accessSecretKey = ref<string>('');
const prompt = ref<string>('');
const selectedSample = ref<string>('');
const loading = ref<boolean>(false);
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const myChart = ref<Chart | null>(null);
const appVersion = __APP_VERSION__

onMounted(() => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  accessKey.value = urlParams.get('accessKey') || localStorage.getItem("accessKey") || '';
  accessSecretKey.value = urlParams.get('accessSecretKey') || localStorage.getItem("accessSecretKey") || '';
  prompt.value = urlParams.get('prompt') || localStorage.getItem("prompt") || '';
});

const updateJsonInput = () => {
  prompt.value = selectedSample.value;
};

const generateChart = async () => {
  if (!accessKey.value || !accessSecretKey.value || !prompt.value) {
    Swal.fire("Error", "All inputs are required.", "error");
    return;
  }

  loading.value = true;
  localStorage.setItem('accessKey', accessKey.value);
  localStorage.setItem('accessSecretKey', accessSecretKey.value);
  localStorage.setItem('prompt', prompt.value);

  let chartInput = "";
  try {
    chartInput = await invokeFlow();
    if (chartInput) {
      renderChart(chartInput);
    }
  } catch (error) {
    console.error(`AI Response: '${chartInput}'`);
    console.error("Error generating chart:", error);
    Swal.fire("Error", "Failed to generate chart. Check the console for more details", "error");
  } finally {
    loading.value = false;
  }
};

const invokeFlow = async (): Promise<string> => {
  console.log(`Prompt = '${prompt.value}'`)
  const inputs = [
    {
      content: { document: prompt.value },
      nodeName: "FlowInputNode",
      nodeOutputName: "document",
    },
  ];

  const bedrockClient = new BedrockAgentRuntimeClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: accessKey.value,
      secretAccessKey: accessSecretKey.value,
    },
  });

  const command = new InvokeFlowCommand({
    flowIdentifier: import.meta.env.VITE_FLOW_IDENTIFIER,
    flowAliasIdentifier: import.meta.env.VITE_FLOW_ALIAS_IDENTIFIER,
    inputs,
  });

  let chartInput = "";

  try {
    let flowResponse: any = {};
    const response = await bedrockClient.send(command);

    if (response && response.responseStream) {
      for await (const chunkEvent of response.responseStream) {
        const { flowOutputEvent, flowCompletionEvent } = chunkEvent;

        if (flowOutputEvent) {
          flowResponse = { ...flowResponse, ...flowOutputEvent };
          chartInput = flowResponse?.content?.document;
          console.log(`AI Response = '${chartInput}'`);
        } else if (flowCompletionEvent) {
          if (flowCompletionEvent.completionReason == 'SUCCESS') {
            console.log(`flowCompletionEvent: Success`);
          } else {
            //log(`flowCompletionEvent: ${flowCompletionEvent}`, true);
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  let jsonObj = {};

  try {
    if (chartInput) {
      jsonObj = JSON.parse(chartInput);
      if (jsonObj && jsonObj.Error) {
        Swal.fire("Error", jsonObj.Error, "error");
        chartInput = "";
      }
    } else {
      Swal.fire("Error", "No response from AI", "error");
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Failed to generate chart. Check the console for more details", "error");
    chartInput = "";
  }

  return (chartInput);
};

const renderChart = (chartConfigString: string) => {
  if (myChart.value) myChart.value.destroy();
  let chartConfig = JSON.parse(chartConfigString);
  if (chartCanvas.value) {
    chartCanvas.value.innerHTML = "";
    const ctx = chartCanvas.value.getContext('2d');
    if (ctx) {
      myChart.value = new Chart(ctx, chartConfig);
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
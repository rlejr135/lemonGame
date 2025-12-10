<template>
  <div>
    <h4 class="mb-3">레시피 비교</h4>

    <table class="table table-bordered table-sm align-middle text-center">
      <thead>
        <tr>
          <th>Param</th>
          <th v-for="step in stepKeys" :key="step">
            {{ step }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="param in paramKeys" :key="param">
          <td class="fw-bold">{{ param }}</td>

          <td
            v-for="step in stepKeys"
            :key="param + step"
            :class="{
              'table-warning': isDifferent(step, param)
            }"
          >
            {{ displayValue(step, param) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup>
import { computed } from "vue";

const props = defineProps({
  baseData: Object,   // base 검색 결과 → { value: {...} }
  compData: Object    // comp 검색 결과 → { value: {...} }
});

// -------------------------------
// Step / Param Keys 추출
// -------------------------------
const stepKeys = computed(() => {
  if (!props.baseData?.value) return [];
  return Object.keys(props.baseData.value);
});

const paramKeys = computed(() => {
  if (!props.baseData?.value) return [];

  const keys = new Set();

  for (const step of stepKeys.value) {
    const stepObj = props.baseData.value[step];
    for (const param in stepObj) {
      keys.add(param);
    }
  }

  return [...keys];
});

// -------------------------------
// Helper: base / comp values
// -------------------------------
function baseValue(step, param) {
  return props.baseData?.value?.[step]?.[param] ?? "";
}

function compValue(step, param) {
  return props.compData?.value?.[step]?.[param] ?? "";
}

// 출력: "base/comp"
function displayValue(step, param) {
  const base = baseValue(step, param);

  if (!props.compData) return base;

  const comp = compValue(step, param);
  return `${base}/${comp}`;
}

// 비교: 다르면 highlight
function isDifferent(step, param) {
  if (!props.compData) return false;
  return baseValue(step, param) != compValue(step, param);
}
</script>

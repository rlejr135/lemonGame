<template>
  <div class="container py-3">

    <!-- Base equipment selection -->
      <div class="card p-3 mb-4">
    <CascadingSelect
      title="base eqp"
      type="base"
      @search="onSearch"
    />
  </div>

    <!-- Comparison eqp selections -->
<div
  v-for="sel in selectors"
  :key="sel.type"
  class="position-relative mb-4"
>
  <!-- 삭제 버튼 (X) -->
  <button
    class="btn-close position-absolute"
    style="right: 5px; top: 5px; z-index: 20;"
    @click.stop="removeSelector(sel.type)" 
  ></button>

  <!-- 선택 버튼 -->
  <button
    class="btn btn-sm btn-outline-primary position-absolute"
    style="right: 40px; top: 5px; z-index: 20;"
    @click.stop="selectCard(sel.type)"
  >
    Select
  </button>

  <!-- 카드 -->
  <div
    class="card p-3"
    :class="{
      'border-primary shadow': selectedCard === sel.type,
      'border-secondary': selectedCard !== sel.type
    }"
    style="cursor: default; transition: 0.2s;"
  >
    <CascadingSelect
      :title="sel.title"
      :type="sel.type"
      @search="onSearch"
    />
  </div>
</div>

    <!-- Add button -->
    <button class="btn btn-primary mt-4" @click="addSelector">
      ➕ 비교 eqp 추가
    </button>

    <!-- Compare Table (결과 표시) -->
    <div class="mt-5" v-if="compareReady">
    <RecipeCompareTable
        v-if="baseData"
        :baseData="baseData"
        :compData="selectedCompareData"
        />
    </div>




  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import CascadingSelect from "../components/cascading.vue";
import RecipeCompareTable from "../components/rcpCompTable.vue";
import { useRecipeCompare } from "../composables/useRecipeCompare";

const { compareRecipes } = useRecipeCompare();

// comp eqp 목록
const selectors = ref([]);

// base 및 비교 데이터 저장
const baseData = ref(null);
const compareList = ref([]);

// 선택된 카드
const selectedCard = ref(null);

/* ------------------------------- */
/*  Add / Remove Dynamic Selectors */
/* ------------------------------- */
function addSelector() {
  const nextIndex = selectors.value.length + 1;

  selectors.value.push({
    title: `comp eqp ${nextIndex}`,
    type: `${nextIndex}`
  });
}

function removeSelector(type) {
  selectors.value = selectors.value.filter(sel => sel.type !== type);
  if (selectedCard.value === type) {
    selectedCard.value = null;
  }
}

/* ------------------------------- */
/*  Search Handling                */
/* ------------------------------- */
function onSearch(result) {
  console.log("검색 결과:", result);

  if (result.source === "base") {
    baseData.value = result;
  } else {
    const idx = compareList.value.findIndex(c => c.source === result.source);

    if (idx >= 0) compareList.value[idx] = result;
    else compareList.value.push(result);
  }
}

/* ------------------------------- */
/*  Selected Compare Data          */
/* ------------------------------- */
const selectedCompareData = computed(() => {
    if (!selectedCard.value) return null;
  return compareList.value.find(x => x.source === selectedCard.value) || null;
});

/* ------------------------------- */
/*  Compare Table 표시 조건        */
/* ------------------------------- */
const compareReady = computed(() => {
  return baseData.value && selectedCompareData.value;
});

function selectCard(type) {
  selectedCard.value = type;
}
</script>

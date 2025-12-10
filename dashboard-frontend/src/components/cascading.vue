<template>

    <!-- 동적 드롭다운들 -->
    <div class="d-flex gap-3 flex-wrap align-items-end mb-3 mt-4">

  <h5 class="mb-3">{{ title }}</h5>

  <!-- 사용자 선택 -->
  <div style="min-width:150px">
    <select class="form-select" v-model="selectedUser" @change="onUserSelected">
      <option disabled value="">사용자 선택</option>
      <option v-for="u in users" :key="u">{{ u }}</option>
    </select>
  </div>

  <!-- 레벨별 드롭박스 -->
  <div
    v-for="(levelOptions, index) in levels"
    :key="index"
    style="min-width:150px"
  >
    <select
      class="form-select"
      v-model="selectedPath[index]"
      @change="onSelectChange(index)"
    >
      <option disabled value="">선택하세요</option>
      <option v-for="opt in levelOptions" :key="opt">{{ opt }}</option>
    </select>
  </div>

  <!-- 검색 버튼을 flex row 안으로 이동 -->
  <div v-if="readyToSearch">
    <button class="btn btn-primary" @click="onSearch">
      🔍 검색
    </button>
  </div>

</div>

</template>
<script setup>
import { ref } from "vue";
import { mockTreeData, mockUsers } from "../mock/recipes";

const props = defineProps({
  title: String,
  type: String
});

const emit = defineEmits(["search"]);

const users = mockUsers;

const selectedUser = ref("");

const rawData = ref({});
const levels = ref([]);
const selectedPath = ref([]);

const readyToSearch = ref(false);   // <--- leaf 도달 여부

/* ------------------------- */
/*  사용자 선택 = root 생성  */
/* ------------------------- */
function onUserSelected() {
  readyToSearch.value = false;
  selectedPath.value = [];
  levels.value = [];

  if (!selectedUser.value) return;

  rawData.value = mockTreeData[selectedUser.value];

  levels.value.push(Object.keys(rawData.value));
}

/* ------------------------- */
/*   cascade 드롭다운 로직   */
/* ------------------------- */function onSelectChange(levelIndex) {
  readyToSearch.value = false;

  // 현재 선택 이후의 상태 초기화
  selectedPath.value = selectedPath.value.slice(0, levelIndex + 1);
  levels.value = levels.value.slice(0, levelIndex + 1);

  // node 탐색
  let node = rawData.value;
  for (let i = 0; i <= levelIndex; i++) {
    node = node[selectedPath.value[i]];
  }

  // ⭐ Case 1: node가 배열이면 → 다음 dropdown은 배열 내부 요소들
  if (Array.isArray(node)) {
    levels.value.push(node);  // CleanStep_A, CleanStep_B ...
    return;
  }

  // ⭐ Case 2: 선택된 값이 문자열이면 → 진짜 leaf
  if (typeof node === "string") {
    readyToSearch.value = true;
    return;
  }

  // ⭐ Case 3: node가 object이면 → 계속 drill-down
  if (typeof node === "object" && node !== null) {
    levels.value.push(Object.keys(node));
    return;
  }

  // ⭐ 그 외는 leaf 처리
  readyToSearch.value = true;
}



/* ------------------------- */
/*        Search emit        */
/* ------------------------- */
function onSearch() {
  let node = rawData.value;

  // path 따라 내려가 leaf 데이터 찾기
  for (let key of selectedPath.value) {
    node = node[key];
  }

  console.log(props);
emit("search", {
  source: props.type,
  value: [selectedUser.value, ...selectedPath.value],
});
}
</script>

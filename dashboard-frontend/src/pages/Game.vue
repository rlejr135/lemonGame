<template>

  <div>

    <!-- 점수 / 시간 -->
    <div class="d-flex justify-content-between mb-3">
      <div><strong>점수:</strong> {{ score }}</div>
      <div><strong>남은 시간:</strong> {{ formattedTime }}</div>
    </div>

    <!-- 게임 종료 화면 -->
    <div v-if="gameOver" class="alert alert-info">
      게임 종료! 최종 점수: <strong>{{ score }}</strong>

      <!-- 이름 입력 -->
      <div class="mt-2" v-if="!scoreSubmitted">
        <label class="form-label">이름을 입력하세요</label>
        <div class="input-group">
          <input
            v-model="playerName"
            type="text"
            class="form-control"
            placeholder="이름"
          />
          <button class="btn btn-primary" @click="submitScore" :disabled="!playerName">
            점수 전송
          </button>
        </div>
      </div>

      <div class="mt-2" v-else>
        점수가 서버로 전송되었습니다 ✅
      </div>

      <!-- 재시작 버튼 -->
      <div class="mt-3">
        <button class="btn btn-warning" @click="restartGame">
          🔄 게임 재시작
        </button>
      </div>
    </div>

    <!-- 게임 보드 -->
    <div class="d-flex justify-content-center">
        <div
          class="board"
          @mousedown="mouseDown"
          @mousemove="mouseMove"
          @mouseup="endDrag"
          @mouseleave="endDrag"

          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="endDrag"
        >
          <div
            v-for="(row, rIdx) in grid"
            :key="rIdx"
            class="board-row"
          >
            <div
              v-for="(cell, cIdx) in row"
              :key="cell.id"
              class="cell"
              :data-id="cell.id"
              :class="{
                'cell-empty': cell.removed,
                'cell-selected': isSelected(cell),
                'cell-disabled': gameOver
              }"
              @mousedown.left.prevent="startDrag(cell)"
              @mouseover="continueDrag(cell)"
            >
              <span v-if="!cell.removed">{{ cell.value }}</span>
            </div>
          </div>
        </div>
    </div>
    <!-- 설명 -->
    <div class="mt-3">
      <small class="text-muted">
        드래그하여 직사각형 영역을 선택하고, 선택된 숫자의 합이 10이면 칸이 사라지고 점수가 증가합니다.
      </small>
    </div>

  </div>

</template>


<script>
import axios from "axios";
import { API_BASE } from "@/api.js";

export default {
  data() {
    return {
      rows: 10,
      cols: 15,
      grid: [],
      isDragging: false,
      selectedCells: [],
      startCell: null,   // ★ 추가
      endCell: null,     // ★ 추가
      score: 0,
      timeLimitSec: 120,
      timeLeft: 120,
      timerId: null,
      gameOver: false,
      playerName: "",
      scoreSubmitted: false
    };
  },


  computed: {
    formattedTime() {
      const m = Math.floor(this.timeLeft / 60);
      const s = this.timeLeft % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    },
  },

  created() {
    
  this.detectMobile();
    this.resetGame();
  },

  methods: {

    detectMobile() {
      const isMobile = window.innerWidth < 600;

      if (isMobile) {
        // 모바일 전용 보드 크기
        this.rows = 15;
        this.cols = 10;
      } else {
        // PC 전용 보드 크기
        this.rows = 10;
        this.cols = 15;
      }
    },
    /** 게임 시작/재시작 **/
    restartGame() {
      this.resetGame();
    },

    resetGame() {
      this.score = 0;
      this.gameOver = false;
      this.scoreSubmitted = false;
      this.playerName = "";
      this.initGrid();
      this.startTimer();
    },

    /** 보드 생성 **/
    initGrid() {
      let idCounter = 0;
      this.grid = [];
      for (let r = 0; r < this.rows; r++) {
        const row = [];
        for (let c = 0; c < this.cols; c++) {
          row.push({
            id: idCounter++,
            row: r,
            col: c,
            value: this.randomValue(),
            removed: false,
          });
        }
        this.grid.push(row);
      }
    },

    randomValue() {
      return Math.floor(Math.random() * 9) + 1;
    },

    /** 타이머 **/
    startTimer() {
      this.timeLeft = this.timeLimitSec;

      if (this.timerId) clearInterval(this.timerId);

      this.timerId = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.endGame();
        }
      }, 1000);
    },

    endGame() {
      if (this.gameOver) return;
      this.gameOver = true;
      this.isDragging = false;
      this.selectedCells = [];
      if (this.timerId) clearInterval(this.timerId);
    },

    /** 드래그 시작 **/
    startDrag(cell) {
      if (this.gameOver || cell.removed) return;
      this.isDragging = true;
      this.startCell = cell;
      this.endCell = cell;
      this.selectedCells = [cell];
    },

    /** 드래그 중 **/
    continueDrag(cell) {
      if (!this.isDragging || this.gameOver) return;
      this.endCell = cell;
      this.updateRectangleSelection();
    },

    /** 드래그 영역 선택 */
    updateRectangleSelection() {
      if (!this.startCell || !this.endCell) return;  // ★ 안정성 추가

      const r1 = this.startCell.row;
      const c1 = this.startCell.col;
      const r2 = this.endCell.row;
      const c2 = this.endCell.col;

      const rMin = Math.min(r1, r2);
      const rMax = Math.max(r1, r2);
      const cMin = Math.min(c1, c2);
      const cMax = Math.max(c1, c2);

      const rect = [];

      for (let r = rMin; r <= rMax; r++) {
        for (let c = cMin; c <= cMax; c++) {
          const cell = this.grid[r][c];
          if (!cell.removed) rect.push(cell);
        }
      }

      this.selectedCells = rect;
    },

    /** 드래그 종료 **/
    endDrag() {
      if (!this.isDragging) return;
      this.isDragging = false;

      const selected = [...this.selectedCells];  // ★ 복사본 사용

      if (selected.length >= 2) {
        const sum = selected.reduce((acc, cell) => acc + cell.value, 0);
        if (sum === 10) {
          this.removeSelectedCells(selected);
          this.score += selected.length;
        }
      }

      this.selectedCells = [];
      this.startCell = null;
      this.endCell = null;
    },

    /** 선택된 셀 제거 **/
    removeSelectedCells(cells) {
      for (const cell of cells) {
        const gCell = this.grid[cell.row][cell.col];
        gCell.removed = true;
        gCell.value = 0;
      }
    },

    /** 점수 제출 **/
    async submitScore() {
      try {
        await axios.post(`${API_BASE}/api/submit-score`, {
          name: this.playerName,
          score: this.score,
        });
        this.scoreSubmitted = true;
      } catch (e) {
        console.error(e);
        alert("점수 전송 중 오류가 발생했습니다.");
      }
    },

    /** 선택 표시 여부 **/
    isSelected(cell) {
      return this.selectedCells.some((c) => c.id === cell.id);
    },

    mouseDown(event, cell) {
      this.startDrag(cell);
    },

    mouseMove(event, cell) {
      if (!this.isDragging) return;
      this.continueDrag(cell);
    },

    // 터치 이벤트
    touchStart(e) {
      e.preventDefault();

      const cell = this.getCellFromTouch(e.touches[0]);
      if (cell) this.startDrag(cell);
    },

    touchMove(e) {
      e.preventDefault();

      const cell = this.getCellFromTouch(e.touches[0]);
      if (cell) this.continueDrag(cell);
    },

    getCellFromTouch(touch) {
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!element) return null;

      const cellId = element.getAttribute("data-id");
      if (!cellId) return null;

      const id = parseInt(cellId);
      for (const row of this.grid) {
        for (const cell of row) {
          if (cell.id === id) return cell;
        }
      }
      return null;
    }
  }
};
</script>


<style scoped>

  @media (max-width: 600px) {
    .cell {
      width: 42px;
      height: 42px;
      font-size: 20px;
    }
  }

.cell span {
  pointer-events: none; /* 터치/마우스 선택 안정화 */
}


.board {
  display: inline-block;
  border: 1px solid #ccc;
  user-select: none;
  touch-action: none; /* 모바일 브라우저 스크롤 방지 */
}

.board-row {
  display: flex;
}

.cell {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd; /* ★ FIX */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
}

.cell-empty {
  background-color: #e9ecef;
  color: #bbb;
}

.cell-selected {
  background-color: #0d6efd;
  color: #fff;
}

.cell-disabled {
  cursor: default;
}

</style>

<template>
  <div>
    <h2>🏆 랭킹</h2>

    <button class="btn btn-secondary mb-3" @click="loadRanking">
      🔄 새로고침
    </button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>이름</th>
          <th>점수</th>
          <th>시간</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, idx) in rankings" :key="idx">
          <td>{{ idx + 1 }}</td>
          <td>{{ r.name }}</td>
          <td>{{ r.score }}</td>
          <td>{{ r.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rankings: []
    };
  },

  methods: {
    async loadRanking() {
      const res = await axios.get("http://192.168.9.62:5001/api/scores");
      this.rankings = res.data;
    }
  },

  mounted() {
    this.loadRanking();
  }
};
</script>

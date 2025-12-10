<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">레몬 게임</h1>

    <!-- 네비게이션 -->
    <nav class="mb-4">
      <router-link class="btn btn-primary me-2" to="/home">
        🏠 홈으로
      </router-link>
      <router-link class="btn btn-primary me-2" to="/game">
        🎮 게임하기
      </router-link>
      <router-link class="btn btn-secondary me-2" to="/ranking">
        🏆 랭킹
      </router-link>

      <router-link class="btn btn-secondary" to="/testrcp">
        rcp comp test
      </router-link>
    </nav>

    <!-- 여기에 각 페이지(Game/Ranking)가 렌더링됨 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>
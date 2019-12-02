<template>
<v-card>
  <v-card-title primary-title>
    <h3 class="headline mb-0">{{obj.name}}</h3>
  </v-card-title>
  <v-divider light></v-divider>
  <v-card-text>
    <div>분류: {{obj.class}}</div>
    <div>시작시간: {{obj.stime}}</div>
    <div>종료시간: {{obj.ftime}}</div>
    <div>휴식시간: {{obj.rtime}}</div>
    <div>특이사항: {{obj.special}}</div>
  </v-card-text>
</v-card>
</template>
<script>
export default {
  props: ['obj']
}
</script>

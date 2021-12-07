<template>
  <com-content refresh title="上拉加载、下拉刷新">123</com-content>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ComContent from '@/components/Content/index.vue';

export default defineComponent({
  name: 'DemoRefresh',
  components: {
    ComContent,
  },
  setup() {
    return {};
  },
});
</script>

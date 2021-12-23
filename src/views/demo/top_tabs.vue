<template>
  <top-tabs title="topTabs" :list="list"></top-tabs>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TopTabs, { TopTabsList } from '@/components/TopTabs/index.vue';

import TopTabsList1 from './top_tabs_list_1.vue';
import TopTabsList2 from './top_tabs_list_2.vue';

export default defineComponent({
  name: 'DemoTopTabs',
  components: { TopTabs },
  setup() {
    const list: TopTabsList[] = [
      {
        title: '测试1',
        component: TopTabsList1,
      },
      {
        title: '测试2',
        component: TopTabsList2,
      },
    ];
    return {
      list,
    };
  },
});
</script>

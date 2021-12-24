<template>
  <top-tabs title="topTabs" :list="list" @loadMore="loadMore"></top-tabs>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TopTabs, { TopTabsList } from '@/components/TopTabs/index.vue';

import TopTabsList1 from './top_tabs_list_1.vue';
import TopTabsList2 from './top_tabs_list_2.vue';
import { PullUpRefresherParam } from '@/components/Content/index.vue';
import log from '@/utils/log';

export default defineComponent({
  name: 'DemoTopTabs',
  components: { TopTabs },
  setup() {
    const list: TopTabsList[] = [
      {
        title: '测试1',
        component: TopTabsList1,
        key: 'test1',
      },
      {
        title: '测试2',
        component: TopTabsList2,
        key: 'test2',
      },
    ];

    function loadMore(
      data: { params: PullUpRefresherParam; done: Function },
      key: string,
    ) {
      switch (key) {
        case 'test1':
          log.d(key);
          log.d(data, 'data1');
          setTimeout(() => {
            data.done([]);
          }, 1000);
          break;
        case 'test2':
          log.d(key);
          log.d(data, 'data2');
          setTimeout(() => {
            data.done([]);
          }, 1000);
          break;
        default:
      }
    }
    return {
      list,
      loadMore,
    };
  },
});
</script>

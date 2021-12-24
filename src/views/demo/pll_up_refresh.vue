<template>
  <com-content refresh title="上拉加载、下拉刷新" @loadMore="loadMore">
    123
  </com-content>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ComContent, {
  PullUpRefresherParam,
} from '@/components/Content/index.vue';
import { mockListPage } from '@/mock/list';
import log from '@/utils/log';

export default defineComponent({
  name: 'DemoRefresh',
  components: {
    ComContent,
  },
  setup() {
    function loadMore(data: { params: PullUpRefresherParam; done: Function }) {
      log.d(mockListPage(), 'page');
      console.log(data.params);
      setTimeout(() => {
        data.done([]);
      }, 1000);
    }
    return {
      loadMore,
    };
  },
});
</script>

<template>
  <ion-content
    :scroll-events="true"
    class="content_container"
    @ionScroll="ionScroll"
    :style="
      isTabs > 0
        ? {
            height: `calc(100vh - ${
              Config.height.tabsHeight + Config.height.headerHeight
            }px)`,
            overflowY: 'auto',
          }
        : {}
    "
  >
    <ion-refresher
      v-if="refresh && !isTabs"
      slot="fixed"
      @ionRefresh="doRefresh($event)"
    >
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <slot />
    <ion-infinite-scroll
      v-if="refresh && !isTabs"
      @ionInfinite="loadData($event)"
      threshold="100px"
      id="infinite-scroll"
      :disabled="isDisabled"
    >
      <ion-infinite-scroll-content
        loading-spinner="bubbles"
        loading-text="加载中..."
      ></ion-infinite-scroll-content>
    </ion-infinite-scroll>
    <div v-if="isDisabled" class="noData">没有更多了</div>

    <img
      @click="returnTop"
      class="return_top"
      :style="isShowTop ? { display: 'block' } : { display: 'none' }"
      src="http://vue3.admin.qiniu.start6.cn/%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8.png"
      alt="返回顶部"
    />
  </ion-content>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import {
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';
import _ from 'lodash';
import Config from '@/config/index';

export interface PullUpRefresherParam {
  page: number;
  size: number;
}
export default defineComponent({
  name: 'ContentContainer',
  components: {
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  },
  props: {
    // 下拉是否开启刷新
    refresh: {
      type: Boolean,
      default: false,
    },
    // 是否是tab
    isTabs: {
      type: Boolean,
      default: false,
    },
    // 是否初始化加载
    isLoad: {
      type: Boolean,
      default: false,
    },
    // tab 默认选择当前index
    currentTabSelect: {
      type: Number,
      default: 0,
    },
  },
  emits: ['loadMore'],
  setup(props, { emit }) {
    const isShowTop = ref(false);
    const contentRef = ref();
    const page = ref(1);
    const size = ref(10);
    // 超时时间 默认5s
    const timeOut = 5000;
    // 是否禁用加载更多
    const isDisabled = ref(false);
    // 是否是第一次加载
    const isInitLoad = ref(true);

    // 是否刷新、加载完成
    const whether = ref({
      isRefresh: false,
      isLoad: false,
    });

    function loadMore(status: 'load' | 'refresh'): Promise<1 | 2> {
      return new Promise((resolve) => {
        const params: PullUpRefresherParam = {
          page: page.value,
          size: size.value,
        };
        emit('loadMore', {
          params,
          done: (val: any[]) => {
            if (status === 'load') {
              whether.value.isLoad = false;
            } else if (status === 'refresh') {
              whether.value.isRefresh = false;
            }
            resolve(1);
            if (val.length < size.value) {
              // 没有更多了
              resolve(2);
            }
          },
        });
      });
    }

    // 加载更多
    async function loadData(event: any) {
      // 超时处理
      setTimeout(() => {
        if (!whether.value.isLoad) {
          event.target.complete();
        }
      }, timeOut);
      const result = await loadMore('load');
      if (result === 2) {
        // 没有更多了
        event.target.disabled = true;
        isDisabled.value = true;
      }
      event.target.complete();
      whether.value.isLoad = true;
    }

    // 下拉刷新
    async function doRefresh(event: any) {
      page.value = 1;
      // 超时处理
      setTimeout(() => {
        if (!whether.value.isRefresh) {
          event.target.complete();
        }
      }, timeOut);
      await loadMore('refresh');
      // 关闭刷新
      event.target.complete();
      whether.value.isRefresh = true;
      isDisabled.value = false;
    }
    function returnTop() {
      contentRef.value.scrollToTop(500);
    }
    const ionScroll = _.throttle((val: any) => {
      const top = val.detail.scrollTop;
      contentRef.value = val.target;
      isShowTop.value = top > Config.showTopHeight;
    }, 1000);

    function initLoad() {
      if (props.isLoad) {
        loadMore('load');
        isInitLoad.value = false;
      }
    }
    onMounted(() => {
      initLoad();
    });

    watch(
      () => props.currentTabSelect,
      () => {
        if (!props.isLoad && isInitLoad.value) {
          loadMore('load');
          isInitLoad.value = false;
        }
      },
    );

    return {
      doRefresh,
      chevronDownCircleOutline,
      loadData,
      isDisabled,

      Config,
      returnTop,
      ionScroll,
      isShowTop,
      contentRef,
      loadMore,
    };
  },
});
</script>
<style scoped lang="scss">
.content {
  height: 300px;
}
.content_container {
  width: 100%;
  //height: 300px;
  //border: 1px solid red;
}
.noData {
  text-align: center;
  font-size: 20px;
}
.return_top {
  position: fixed;
  display: none;
  bottom: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
}
</style>

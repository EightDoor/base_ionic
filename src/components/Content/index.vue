<template>
  <ion-page>
    <ion-header v-if="title">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="返回"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="content_container">
      <ion-refresher
        v-if="refresh"
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <template #fixed>
        <slot name="fixed" />
      </template>
      <slot />
      <ion-infinite-scroll
        v-if="refresh"
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
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButtons,
  IonBackButton,
} from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';

export interface PullUpRefresherParam {
  page: number;
  size: number;
}
export default defineComponent({
  name: 'CommContent',
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonRefresher,
    IonRefresherContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonButtons,
    IonBackButton,
  },
  props: {
    // 标题
    title: {
      type: String,
    },
    // 下拉是否开启刷新
    refresh: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['loadMore'],
  setup(props, { emit }) {
    const page = ref(1);
    const size = ref(10);
    // 超时时间 默认5s
    const timeOut = 5000;
    // 是否禁用加载更多
    const isDisabled = ref(false);

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
        emit('loadMore', params, (val: any[]) => {
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

    return {
      doRefresh,
      chevronDownCircleOutline,
      loadData,
      isDisabled,
    };
  },
});
</script>
<style scoped lang="scss">
.content {
  height: 300px;
}
.content_container {
  //height: 300px;
  //border: 1px solid red;
}
.noData {
  text-align: center;
  font-size: 20px;
}
</style>

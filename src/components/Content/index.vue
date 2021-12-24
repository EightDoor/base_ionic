<template>
  <ion-page>
    <ion-header
      :style="{ height: `${Config.height.headerHeight}px` }"
      v-if="title"
    >
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="返回"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <div class="fixed_content">
      <slot name="tabs" />
    </div>
    <slot v-if="isTabs" />
    <content-container
      v-else
      :refresh="refresh"
      :isTabs="isTabs"
      @loadMore="loadMore"
    >
      <slot />
    </content-container>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';

import Config from '@/config/index';
import ContentContainer from './content_container.vue';

export interface PullUpRefresherParam {
  page: number;
  size: number;
}
export default defineComponent({
  name: 'CommContent',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    ContentContainer,
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
    isTabs: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['loadMore'],
  setup(props, { emit }) {
    function loadMore(params: PullUpRefresherParam, done: Function) {
      emit('loadMore', params, done);
    }
    return {
      chevronDownCircleOutline,

      Config,
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

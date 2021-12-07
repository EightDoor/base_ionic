<template>
  <ion-page>
    <ion-header v-if="title">
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher
        v-if="refresh"
        slot="fixed"
        @ionRefresh="doRefresh($event)"
      >
        <ion-refresher-content
          :pulling-icon="chevronDownCircleOutline"
          pulling-text="下拉刷新"
          refreshing-spinner="circles"
          refreshing-text="刷新中..."
        >
          <div class="content">
            <slot />
          </div>
        </ion-refresher-content>
      </ion-refresher>
      <div v-else class="content">
        <slot />
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';
import log from '@/utils/log';

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
  setup() {
    // 下拉刷新
    function doRefresh(val: any) {
      log.d(val, 'val');
    }
    return {
      doRefresh,
      chevronDownCircleOutline,
    };
  },
});
</script>
<style scoped lang="scss">
.content {
  height: 300px;
}
</style>

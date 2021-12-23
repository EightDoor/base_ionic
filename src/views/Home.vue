<template>
  <ion-page>
    <ion-tabs
      @ionTabsWillChange="beforeTabChange"
      @ionTabsDidChange="afterTabChange"
    >
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home/index">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>首页</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="my" href="/home/my">
          <ion-icon :icon="personCircle"></ion-icon>
          <ion-label>我的</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
      <ion-router-outlet />
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonLabel,
  IonPage,
  IonIcon,
  IonTabButton,
  IonTabBar,
  IonTabs,
  IonRouterOutlet,
} from '@ionic/vue';
import { personCircle, homeOutline } from 'ionicons/icons';

interface ListType {
  title: string;
  path: string;
}
export default defineComponent({
  name: 'ViewsHome',
  components: {
    IonLabel,
    IonPage,
    IonIcon,
    IonTabButton,
    IonTabBar,
    IonTabs,
    IonRouterOutlet,
  },
  setup() {
    const router = useRouter();
    const list = ref<ListType[]>([
      {
        title: '上拉加载、下拉刷新',
        path: '/pll_up_refresh',
      },
    ]);

    function change(val: ListType) {
      router.push({
        path: val.path,
      });
    }

    const beforeTabChange = () => {
      // do something before tab change
    };
    const afterTabChange = () => {
      // do something after tab change
    };
    return {
      list,
      change,

      homeOutline,
      personCircle,
      beforeTabChange,
      afterTabChange,
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>

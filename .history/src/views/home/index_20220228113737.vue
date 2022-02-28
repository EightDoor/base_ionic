<template>
  <comm-content title="首页">
    <ion-list>
      <ion-item
        @click="change(item)"
        v-for="(item, index) in list"
        :key="index"
      >
        <ion-label>{{ item.title }}</ion-label>
      </ion-item>
      <ion-item @click="showToast">弹出提示消息</ion-item>
      <ion-item @click="showToast('loading')">弹出loading加载</ion-item>
    </ion-list>
  </comm-content>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonList, IonItem, IonLabel } from '@ionic/vue';
import CommContent from '@/components/Content/index.vue';
import Toast from '@/utils/toast';

interface ListType {
  title: string;
  path: string;
}

export default defineComponent({
  name: 'ViewsHome',
  components: { CommContent, IonList, IonItem, IonLabel },
  setup() {
    const router = useRouter();
    const list = ref<ListType[]>([
      {
        title: '上拉加载、下拉刷新',
        path: '/pll_up_refresh',
      },
      {
        title: '顶部tabs',
        path: '/top_tabs',
      },
    ]);
    function change(val: ListType) {
      router.push({
        path: val.path,
      });
    }

    function showToast(val?: string) {
      switch (val) {
        case 'loading':
          Toast.showLoading('测试内容...');
          break;
        default:
          Toast.showMsg('测试内容');
      }
    }
    return {
      list,
      change,

      showToast,
    };
  },
});
</script>

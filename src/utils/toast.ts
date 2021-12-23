import { loadingController, toastController } from '@ionic/vue';
import { Components } from '@ionic/core';
import IonLoading = Components.IonLoading;

const Toast = {
  /**
   * 展示提示
   * @param message
   */
  async showMsg(message?: string) {
    const r = await toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    return r.present();
  },
  /**
   * 弹出提示框
   * @param message
   */
  async showLoading(message?: string): Promise<IonLoading> {
    const loading = await loadingController.create({
      cssClass: 'my-custom-class',
      message,
      duration: 2000,
    });
    await loading.present();

    setTimeout(() => {
      // 无响应了 5s自动关闭
      loading.dismiss();
    }, 5000);
    return loading;
  },
};

export default Toast;

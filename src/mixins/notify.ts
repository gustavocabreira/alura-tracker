import { NotificationType } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/mutation-types";

export const notificationMixin = {
  methods: {
    notify(type: NotificationType, title: string, content: string) {
      store.commit(NOTIFY, {
        title,
        content,
        type,
      });
    }
  },
}
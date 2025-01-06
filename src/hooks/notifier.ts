import { NotificationType } from "@/interfaces/INotification"
import { store } from "@/store";
import { NOTIFY } from "@/store/mutation-types";

type Notifier = {
  notify: (type: NotificationType, title: string, content: string) => void,
}

export default (): Notifier => {
  const notify = (type: NotificationType, title: string, content: string) => {
    store.commit(NOTIFY, {
      title,
      content,
      type,
    });
  }

  return {
    notify
  };
}
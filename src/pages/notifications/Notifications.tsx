import ConfirmSet from "../../assets/confirmSet.svg";
import SetBack from "../../assets/navigation/setBack.svg";

import type { Notification } from "../../services/notification/notification.service";
import NotificationCard from "./components/NotificationCard";

interface Props {
  visibleNotifications: boolean;
  notifications: Notification[];
  notificationsUnread: number
  setNot: (notifications: Notification[]) => void;
  moveNotificationsBar: (state: boolean) => void;
  deleteNotification:(id: number) => void
  readAllNotications:() => void
  changeRead:(id: number) => void
}

function Notifications({
  visibleNotifications,
  moveNotificationsBar,
  notificationsUnread,
  notifications,
  deleteNotification,
  readAllNotications,
  changeRead
}: Props) {
  return (
    <aside className={`fixed px-6 pt-10 pb-34 top-0 w-screen h-screen z-90 overflow-auto bg-light
        md:px-14 md:mt-0
        xl:w-1/3 xl:min-w-90 xl:h-screen xl:top-0 xl:right-0 xl:mt-0 xl:py-10 xl:border-l-4 xl:border-primary
        ${visibleNotifications ? "block" : "hidden"}`}
    >
      <header className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <img
            onClick={() => moveNotificationsBar(false)}
            src={SetBack}
            alt="Icone que oculta barra de notificações."
            className="rotate-0 w-auto h-6"
          />
          <h2 className="font-poppins text-text-primary font-bold text-2xl">
            Notificações
          </h2>
        </div>
        <button
          onClick={() => readAllNotications()}
          className={`w-32 h-9 justify-center items-center gap-2 rounded-lg bg-accent border-2 border-accent-dark font-poppins font-bold text-sm text-white ${notificationsUnread == 0 ? 'hidden' : 'flex'}`}
        >
          <img
            aria-hidden="true"
            src={ConfirmSet}
            alt=""
            className="w-auto h-2.5"
          />
          Ler todas
        </button>
      </header>
      <main>
        <ul className="flex flex-col w-full mt-14 gap-5">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id_notification} notification={notification} changeRead={changeRead} deleteNotification={deleteNotification} />
          ))}
          <p
            className={`w-full h-15 flex justify-center items-center mt-[50%] font-bold text-primary text-xl text-center ${notifications.length == 0 ? "flex" : "hidden"}`}
          >
            Está tudo tão calmo, como uma soneca da tarde...
          </p>
        </ul>
      </main>
    </aside>

  );
}

export default Notifications;

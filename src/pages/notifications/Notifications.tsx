import ConfirmSet from "../../assets/confirmSet.svg";
import BirthDay from "../../assets/birthdayNotification.svg";
import Vaccine from "../../assets/vaccineNotification.svg";
import Storage from "../../assets/storageNotification.svg";
import Trash from "../../assets/trash.svg";
import SetBack from "../../assets/navigation/setBack.svg";

import type { Notification } from "../../layouts/Header";

interface Props {
  visibleNotifications: boolean;
  notifications: Notification[];
  setNot: (notifications: Notification[]) => void;
  moveNotificationsBar: (state: boolean) => void;
}

function Notifications({
  visibleNotifications,
  moveNotificationsBar,
  notifications,
  setNot,
}: Props) {
  function setImage(type: string) {
    if (type == "vacine") {
      return Vaccine;
    } else if (type == "storage") {
      return Storage;
    } else {
      return BirthDay;
    }
  }

  function deleteNotification(id: number) {
    const newNot = notifications.filter((n: Notification) => n.id != id);

    setNot(newNot);
  }

  function deleteAllNotications() {
    setNot([]);
  }

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
          onClick={() => deleteAllNotications()}
          className="flex w-32 h-9 justify-center items-center gap-2 rounded-lg bg-accent border-2 border-accent-dark font-poppins font-bold text-sm text-white"
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
          {notifications.map((notification: Notification) => (
            <li
              key={notification.id}
              className="flex w-full h-28 p-2 gap-3 rounded-sm border-2 border-primary overflow-hidden
                    xl:hover:scale-102 xl:transition xl:duration-300"
            >
              <div className="flex flex-col justify-between w-auto">
                <img
                  aria-hidden="true"
                  src={setImage(notification.type)}
                  alt=""
                  className="w-12 h-12 p-2 rounded-lg border-2 border-primary"
                />
                <span className="font-nunito text-primary-darker text-sm">
                  15 min
                </span>
              </div>
              <div className="flex flex-col w-[calc(100%-58px)] h-full justify-between items-end">
                <header className="w-full">
                  <p className="font-poppins font-bold text-text-primary text-[1rem]">
                    {notification.title}
                  </p>
                </header>
                <p className="w-full bg-blu font-nunito grow pt-1 text-primary-dark font-extralight text-[0.9rem] overflow-hidden line-clamp-2 text-ellipsis">
                  {notification.description}
                </p>
                <button onClick={() => deleteNotification(notification.id)}>
                  <img
                    src={Trash}
                    alt="Icone para excluir uma notificação."
                    className="w-auto h-4
                                md:h-5"
                  />
                </button>
              </div>
            </li>
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

import Trash from "../../../assets/trash.svg";
import BirthDay from "../../../assets/birthdayNotification.svg";
import Vaccine from "../../../assets/vaccineNotification.svg";
import Storage from "../../../assets/storageNotification.svg";

import Date from "../../../utils/Date";

import type { Notification } from "../../../services/notification/notification.service";

interface Props {
    notification: Notification
    deleteNotification: (id: number) => void
    changeRead: (id: number) => void
}

function setImage(type: string) {
    if (type == "vacinacao") {
        return Vaccine;
    } else if (type == "estoque") {
        return Storage;
    } else if (type == "aniversario") {
        return BirthDay;
    }
}

function NotificationCard({ notification, deleteNotification, changeRead }: Props) {
    return (
        <li onClick={() => changeRead(notification.id_notification)} 
        className="flex items-center justify-between
        xl:hover:scale-102 xl:transition xl:duration-300">
            <div className={`rounded-full bg-primary-dark w-3 h-3 ${notification.read_status ? 'hidden' : 'block'}`}></div>
            <div
                className={`flex h-28 p-2 gap-3 rounded-sm border-2 border-primary overflow-hidden ${notification.read_status ? 'w-full' : 'w-[calc(100%-26px)]'}`}
            >
                <div className="flex flex-col justify-between w-auto">
                    <img
                        aria-hidden="true"
                        src={setImage(notification.notification_type_name)}
                        alt=""
                        className="w-12 h-12 p-2 rounded-lg border-2 border-primary"
                    />
                    <span className="font-nunito text-primary-darker text-sm min-w-15">
                        {Date.subDaysFormated(notification.date_time)}
                    </span>
                </div>
                <div className="flex flex-col w-[calc(100%-58px)] h-full justify-between items-end">
                    <header className="w-full flex justify-between">
                        <p className="font-poppins font-bold text-text-primary text-[1rem]">
                            {notification.title}
                        </p>
                    </header>
                    <p className="w-full bg-blu font-nunito grow pt-1 text-primary-dark font-extralight text-[0.9rem] overflow-hidden line-clamp-2 text-ellipsis">
                        {notification.message}
                    </p>
                    <button onClick={() => deleteNotification(notification.id_notification)}>
                        <img
                            src={Trash}
                            alt="Icone para excluir uma notificação."
                            className="w-auto h-4
                                    md:h-5"
                        />
                    </button>
                </div>
            </div>
        </li>
    )
}

export default NotificationCard
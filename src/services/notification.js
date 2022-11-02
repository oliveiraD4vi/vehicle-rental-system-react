import { notification } from "antd";

export default function Notification(type, message) {
  notification[type]({
    message: message ? message : "Erro desconhecido",
    duration: 0,
  });
}

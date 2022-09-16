import { notification } from "antd";

export default function Notification(type, message) {
  notification[type]({
    message: message,
    duration: 0,
  });
}

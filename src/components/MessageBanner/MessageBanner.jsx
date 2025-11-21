import React from "react";
import { notification } from "antd";

const MessageBanner = ({
  message,
  description,
  type = "info",
  duration = 4.5,
}) => {
  const [api, contextHolder] = notification.useNotification();

  React.useEffect(() => {
    if (message) {
      const notificationMethod =
        type === "success"
          ? api.success
          : type === "error"
          ? api.error
          : type === "warning"
          ? api.warning
          : api.info;

      notificationMethod({
        message: message,
        description: description,
        duration: duration,
        placement: "topRight",
      });
    }
  }, [message, description, type, duration, api]);

  return <>{contextHolder}</>;
};

export default MessageBanner;

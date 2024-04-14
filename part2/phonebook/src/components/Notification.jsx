import React from "react";

const Notification = ({ message, styleClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={styleClass}>
      {message}
    </div>
  )
}

export default Notification;
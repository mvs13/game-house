function operateNotification(notificationId) {
  const notification = document.getElementById(notificationId);
  const hideBtn = document.querySelector(`#${notificationId} .delete`);
  if (hideBtn !== null && notification !== null) {
    notification.classList.add('is-invisible')
    hideBtn.addEventListener('click', (evt) => { 
      notification.classList.add('is-invisible')
    })
  }
}

function showNotificationMsg(notificationId, msg) {
  const notification = document.getElementById(notificationId);
  const msgBox = document.querySelector(`#${notificationId} .notification__msg`);
  console.log(msgBox);
  if (notification !== null && msgBox !== null) {
    msgBox.innerHTML  = msg;
    notification.classList.remove('is-invisible')
   }
}
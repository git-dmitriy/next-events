import { useContext } from 'react';
import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

function layout({ children }) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}

export default layout;

import { Notification } from '../../enterprise/entities/notification';

export interface NotificationsRepository {
  findById(id: string): Notification | null;
  create(notification: Notification): void;
  save(notification: Notification): void;
}

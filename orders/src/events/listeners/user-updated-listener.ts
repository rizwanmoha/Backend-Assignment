import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

import { UserUpdatedEvent } from '../event-types/user-updated-event';
import { Listener } from './base-listener';
import { Subjects } from '../subjects';

export class UserUpdatedListener extends Listener<UserUpdatedEvent> {
  readonly subject = Subjects.UserUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserUpdatedEvent['data'], msg: Message) {
   
    msg.ack();
  }
}

import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

import { OrderShippedEvent } from '../event-types/order-shipped-event';
import { Listener } from './base-listener';
import { Subjects } from '../subjects';

export class OrderShippedListener extends Listener<OrderShippedEvent> {
  readonly subject = Subjects.OrderShipped;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderShippedEvent['data'], msg: Message) {
   
    msg.ack();
  }
}

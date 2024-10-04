import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

import { ProductUpdatedEvent } from '../event-types/product-updated-event';
import { Listener } from './base-listener';
import { Subjects } from '../subjects';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  readonly subject = Subjects.InventoryUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
   
    msg.ack();
  }
}

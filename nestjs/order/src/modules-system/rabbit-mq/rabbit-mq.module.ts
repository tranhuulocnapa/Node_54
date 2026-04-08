import { Global, Inject, Module, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { RABBIT_MQ_URL } from '../../common/constant/app.constant';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [RABBIT_MQ_URL!],
          queue: 'email_queue',
          queueOptions: {
            durable: false,
          },
          socketOptions: {
            connectionOptions: {
              clientProperties: {
                connection_name: 'email-send',
              },
            },
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMqModule implements OnModuleInit {
  constructor(@Inject('EMAIL_SERVICE') private client: ClientProxy) {}

  async onModuleInit() {
    try {
      await this.client.connect();
      console.log('✅ [RABBIT-MQ] Kết nối thành công');
    } catch (error) {
      console.log({ RabbitMqModule: error });
    }
  }
}

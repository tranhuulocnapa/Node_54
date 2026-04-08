import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './modules-microseverice/email/email.module';
import { transporter } from './common/nodemailer/inite.nodemailer';

@Module({
  imports: [EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    try {
      transporter.verify().then(() => {
        console.log('✅ Server is ready to take our messages');
      });
    } catch (err) {
      console.error('Verification failed:', err);
    }
  }
}

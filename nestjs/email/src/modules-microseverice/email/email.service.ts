import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { transporter } from '../../common/nodemailer/inite.nodemailer';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async create(createEmailDto: CreateEmailDto) {
    try {
      const createOrderId = createEmailDto.id;
      const email = createEmailDto.Users.email;
      const fullName = createEmailDto.Users.fullName;
      const foodName = createEmailDto.Foods.name;

      const info = await transporter.sendMail({
        from: 'tranhuulocnapa@gmail.com', // sender address
        to: 'tranhuulocnapa@gmail.com', // list of recipients
        subject: 'Notification Order', // subject line
        text: `Create order id: ${createOrderId}, food: ${foodName}`, // plain text body
        html: `
         <div>
            <h3>Đặt hàng thành công</h3>          
            <p>Đơn hàng mã: ${createOrderId}</p>
            <p>Sản phẩm: ${foodName}</p>
            <p>Cảm ơn bạn ${fullName} đã đặt hàng</p>
          </div>
        
                `, // HTML body
      });

      console.log('Message sent: %s', info.messageId);
      // Preview URL is only available when using an Ethereal test account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      console.log({ createEmailDto });
    } catch (err) {
      console.error('Error while sending mail:', err);
    }
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}

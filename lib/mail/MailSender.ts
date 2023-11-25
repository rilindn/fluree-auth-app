
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: 'mlsn.0732303d4456a88fb830e10b3bf3bb05d85dacfe75d41c34d780df1d2e47f27a',
});
console.log("🚀 ~ file: MailSender.ts:6 ~ process.env.MAILERSEND_API_KEY:", process.env.MAILERSEND_API_KEY)

const sentFrom = new Sender("MS_99a5AA@thoughtbank.ai", "Thought Bank");


export async function emailSender({recipientEmail, verificationCode}: any) {
    const recipients = [
      new Recipient(recipientEmail, "Your Client")
    ];
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("Thought Bank - Confirm Email")
        .setHtml(`
          <div>
            <strong>Confirm email by clicking</strong>
            <a href="http://localhost:3000/auth/confirm-email/${verificationCode}">here</a>
          </div>`
        )
    console.log("🚀 ~ file: MailSender.ts:17 ~ emailSender ~ emailParams:", emailParams)
    
    const res = await mailerSend.email.send(emailParams);
    console.log("🚀 ~ file: MailSender.ts:24 ~ sendMail ~ res:", res)
    return res
}


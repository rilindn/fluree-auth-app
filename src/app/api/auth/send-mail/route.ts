import { NextResponse } from "next/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY as string,
});


export const POST = async (request: any) => {
  const requestBody = await request.json();
  const { recipientEmail, verificationCode, locationOrigin } = requestBody;
   
  try {
    const recipients = [new Recipient(recipientEmail, recipientEmail)];
    const sentFrom = new Sender(process.env.MAILERSEND_SENDER_MAIl as string, "Thought Bank");
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("Thought Bank - Confirm Email")
        .setHtml(`
          <div>
            <strong>Confirm email by clicking</strong>
            <a href="${locationOrigin}/auth/confirm-email/${verificationCode}">here</a>
          </div>`
        )
    
    const res = await mailerSend.email.send(emailParams);
    return new NextResponse("Mail sent successfully!!", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};


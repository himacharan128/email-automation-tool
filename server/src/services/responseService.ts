import { getEmailDetails, sendEmail as sendGmailEmail } from './gmailService';
import { sendOutlookEmail } from './outlookService';
import { assignLabel } from './labelService';
import { parseEmail } from './emailParserService';

const getLabelAndResponse = (body: string) => {
  if (body.includes('interested')) {
    return {
      label: 'Interested',
      response: 'Thank you for your interest. Would you like to schedule a demo call?',
    };
  } else if (body.includes('not interested')) {
    return {
      label: 'Not Interested',
      response: 'Thank you for your time. Have a great day!',
    };
  } else if (body.includes('more information')) {
    return {
      label: 'More Information',
      response: 'Can you please provide more details on what you are looking for?',
    };
  }
  return null;
};

export const suggestGmailResponse = async (messageId: string) => {
  const email = await getEmailDetails(messageId);
  const parsedEmail = parseEmail(email);
  const context = getLabelAndResponse(parsedEmail.body);

  if (context) {
    await assignLabel(messageId, context.label);
    await sendGmailEmail(parsedEmail.from, 'Re: ' + parsedEmail.subject, context.response);
  }
};

export const suggestOutlookResponse = async (accessToken: string, email: any) => {
  const parsedEmail = {
    subject: email.subject,
    from: email.from.emailAddress.address,
    body: email.body.content,
    id: email.id,
  };
  const context = getLabelAndResponse(parsedEmail.body);

  if (context) {
    await sendOutlookEmail(accessToken, parsedEmail.from, 'Re: ' + parsedEmail.subject, context.response);
  }
};

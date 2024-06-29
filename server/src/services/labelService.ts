import { google } from 'googleapis';
import oAuth2Client from '../config/gmailConfig';

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

export const assignLabel = async (messageId: string, label: string) => {
  const labels = {
    'Interested': 'Label_1',
    'Not Interested': 'Label_2',
    'More Information': 'Label_3',
  };
  
  const labelId = labels[label];

  await gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    requestBody: {
      addLabelIds: [labelId],
    },
  });
};

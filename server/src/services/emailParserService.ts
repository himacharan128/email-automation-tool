export const parseEmail = (email: any) => {
    const headers = email.payload.headers;
    const subject = headers.find((header: any) => header.name === 'Subject')?.value;
    const from = headers.find((header: any) => header.name === 'From')?.value;
    const body = email.payload.parts?.find((part: any) => part.mimeType === 'text/plain')?.body?.data;
  
    return {
      subject,
      from,
      body: body ? Buffer.from(body, 'base64').toString('utf-8') : ''
    };
  };
  
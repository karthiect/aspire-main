export interface ContactFields {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export function createContactEmail(form: ContactFields): EmailData {
  return {
    to: 'aspiregrandexcel@gmail.com',
    subject: `Contact enquiry: ${form.subject}`,
    body: [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      `Subject: ${form.subject}`,
      `Message:\r\n${form.message}`,
    ].join('\r\n\r\n').replace(/\r?\n/g, '\r\n'),
  };
}

export function createEmailUrls({ to, subject, body }: EmailData) {
  const gmail = new URLSearchParams({ view: 'cm', fs: '1', to, su: subject, body });
  const outlook = new URLSearchParams({ to, subject, body });
  // mailto uses percent-encoded spaces, not form encoding's plus signs.
  const mailto = new URLSearchParams({ subject, body }).toString().replace(/\+/g, '%20');
  return {
    gmail: `https://mail.google.com/mail/?${gmail}`,
    outlook: `https://outlook.office.com/mail/deeplink/compose?${outlook}`,
    mailto: `mailto:${encodeURIComponent(to)}?${mailto}`,
  };
}

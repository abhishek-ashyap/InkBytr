import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

// Set the API key for SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends an email using SendGrid.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * @param {string} html - The HTML content of the email.
 */
export const sendEmail = async (to, subject, text, html) => {
  const msg = {
    to,
    from: 'abhisheksingh00052@gmail.com', // IMPORTANT: Replace with an email you can verify on SendGrid
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const sesClient = new SESClient({ region: 'us-east-1' })

export const sendEmail = async ({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: 'salve@thermaeclub.com',
  })

  try {
    const result = await sesClient.send(command)
    console.log('Email sent successfully:', result)
    return result
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Error sending email')
  }
}

import AWS from 'aws-sdk'

const ses = new AWS.SES({
  region: 'us-east-1',
})

export const sendEmail = async ({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  const params = {
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
  }

  try {
    const result = await ses.sendEmail(params).promise()
    console.log('Email sent successfully:', result)
    return result
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Error sending email')
  }
}

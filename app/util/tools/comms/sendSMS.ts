import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'

const snsClient = new SNSClient({ region: 'us-east-1' })

export const sendSMS = async ({
  phoneNumber,
  message,
}: {
  phoneNumber: string;
  message: string;
}) => {
  const command = new PublishCommand({
    Message: message,
    PhoneNumber: phoneNumber,
  })

  try {
    const result = await snsClient.send(command)
    console.log('SMS sent successfully:', result)
    return result
  } catch (error) {
    console.error('Error sending SMS:', error)
    throw new Error('Error sending SMS')
  }
}

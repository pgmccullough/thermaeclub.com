import AWS from 'aws-sdk'

const sns = new AWS.SNS({
  region: 'us-east-1',
})

export const sendSMS = async ({
  phoneNumber,
  message,
}: {
  phoneNumber: string;
  message: string;
}) => {
  const params = {
    Message: message,
    PhoneNumber: phoneNumber, // format +1XXX5550100
  }

  try {
    const result = await sns.publish(params).promise()
    console.log('SMS sent successfully:', result)
    return result
  } catch (error) {
    console.error('Error sending SMS:', error)
    throw new Error('Error sending SMS')
  }
}

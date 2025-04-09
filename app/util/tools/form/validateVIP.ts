type PhoneOrEmail = 'phone' | 'email';

type FormData = {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
};

export function validateVIPForm(
  formData: FormData,
  isPhoneOrEmail: PhoneOrEmail,
): { formComplete: boolean; errorAt: string[] } {
  const { firstName, lastName, phone, email } = formData
  const errorAt = []

  if (!firstName.trim()) errorAt.push('firstName')
  if (!lastName.trim()) errorAt.push('lastName')

  if (isPhoneOrEmail === 'phone' && !phone?.trim()) errorAt.push('phone')
  if (isPhoneOrEmail === 'email' && !email?.trim()) errorAt.push('email')

  return {
    formComplete: errorAt.length === 0,
    errorAt,
  }
}

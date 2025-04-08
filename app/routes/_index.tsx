import type { MetaFunction } from '@remix-run/node'
import { MouseEvent, useCallback, useMemo, useState } from 'react'
import styles from '~/styles/routes/index.module.css'

export const meta: MetaFunction = () => {
  return [
    { title: 'Thermae | Toiletry Lux for Gentlemen | Coming Soon' },
    {
      name: 'description',
      content:
        'Discover timeless luxury with Thermae—a collection of fine toiletries crafted for the discerning gentleman. Coming soon.',
    },
  ]
}

export default function Index() {
  enum PhoneOrEmail {
    Phone = 'phone',
    Email = 'email',
  }

  type FormData = {
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
  };

  const [isPhoneOrEmail, setIsPhoneOrEmail] = useState<PhoneOrEmail>(
    PhoneOrEmail.Phone,
  )
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  })

  const handleToggle = (e: MouseEvent, phoneOrEmail: PhoneOrEmail) => {
    e.preventDefault()
    setFormData((prev) => ({ ...prev, phone: '', email: '' }))
    setIsPhoneOrEmail(phoneOrEmail)
  }

  const formComplete = useMemo(() => {
    const { firstName, lastName, phone, email } = formData

    const errorAt = []

    if (!firstName.trim()) {
      errorAt.push('firstName')
    }

    if (!lastName.trim()) {
      errorAt.push('lastName')
    }

    if (isPhoneOrEmail === PhoneOrEmail.Phone && !phone?.trim()) {
      errorAt.push('phone')
    }

    if (isPhoneOrEmail === PhoneOrEmail.Email && !email?.trim()) {
      errorAt.push('email')
    }

    if (errorAt.length) return { formComplete: false, errorAt: errorAt }
    return { formComplete: true, errorAt: [] }
  }, [formData, PhoneOrEmail, isPhoneOrEmail])

  const submitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const { firstName, lastName, phone, email } = formData

      if (!formComplete.formComplete) return

      try {
        const res = await fetch('/api/vip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            ...(isPhoneOrEmail === PhoneOrEmail.Phone ? { phone } : { email }),
          }),
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData?.message || 'Something went wrong.')
        }

        alert('Thanks for joining! We’ll be in touch soon.')
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
        })
      } catch (error: unknown) {
        console.error('DB error:', error)

        let errorMessage =
          'There was an issue saving your information. Please try again.'

        if (error instanceof Error) {
          errorMessage = error.message
        }

        return Response.json({ error: errorMessage }, { status: 500 })
      }
    },
    [formComplete, formData, PhoneOrEmail, isPhoneOrEmail],
  )

  return (
    <main className={styles.card}>
      <h1>Thermae | Toiletry Lux for Gentlemen | Coming Soon</h1>
      <p>
        Discover timeless luxury with Thermae—a collection of fine toiletries
        crafted for the discerning gentleman.
      </p>
      <p>Coming soon.</p>
      <ul>
        <li>
          <a href="https://x.com/thermaeclub">X: @thermaeclub</a>
        </li>
        <li>
          <a href="https://www.instagram.com/join.thermae">
            Instagram: @join.thermae
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@thermaeclub">TikTok: @thermaeclub</a>
        </li>
        <li>
          <a href="https://www.youtube.com/@ThermaeClub">
            YouTube: @thermaeclub
          </a>
        </li>
        <li>
          <a href="https://www.pinterest.com/thermaeclub/">
            Pinterest: @thermaeclub
          </a>
        </li>
      </ul>
      <h2>Join our VIP list for early updates</h2>
      <form className={styles.newsletterForm} onSubmit={submitHandler}>
        <div className={styles.labelInputGroup}>
          <label
            htmlFor="firstName"
            className={`${styles.label} ${styles.required}`}
          >
            First name *
          </label>
          <input
            className={styles.input}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Your first name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
        </div>
        <div className={styles.labelInputGroup}>
          <label
            htmlFor="lastName"
            className={`${styles.label} ${styles.required}`}
          >
            Last name *
          </label>
          <input
            className={styles.input}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Your last name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
        </div>
        <div className={styles.phoneEmailGroup}>
          <div className={styles.phoneEmailToggleWrapper}>
            <button
              className={`${styles.phoneEmailToggle} ${isPhoneOrEmail === PhoneOrEmail.Phone ? styles.phoneEmailToggleActive : ''}`}
              onClick={(e) => handleToggle(e, PhoneOrEmail.Phone)}
            >
              Phone
            </button>
            <button
              className={`${styles.phoneEmailToggle} ${isPhoneOrEmail === PhoneOrEmail.Email ? styles.phoneEmailToggleActive : ''}`}
              onClick={(e) => handleToggle(e, PhoneOrEmail.Email)}
            >
              Email
            </button>
          </div>

          {isPhoneOrEmail === PhoneOrEmail.Phone ? (
            <>
              <label
                htmlFor="phone"
                className={`${styles.label} ${styles.required} ${styles.hidden}`}
              >
                Phone *
              </label>
              <input
                className={styles.input}
                type="text"
                id="phone"
                name="phone"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </>
          ) : (
            <>
              <label
                htmlFor="email"
                className={`${styles.label} ${styles.required} ${styles.hidden}`}
              >
                Email *
              </label>
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </>
          )}
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={!formComplete.formComplete}
        >
          Sign up
        </button>
      </form>
    </main>
  )
}

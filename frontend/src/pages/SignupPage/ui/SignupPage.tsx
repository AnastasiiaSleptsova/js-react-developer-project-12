import { useState, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Alert } from 'antd'
import { AuthService } from '@features/auth/api/authService'
import { useAppDispatch } from '@app/store'
import { setUsername } from '@features/auth'
import { useTranslation } from 'react-i18next'

import styles from './SignupPage.module.scss'

const buildSignupSchema = (t: (key: string) => string) =>
  z
    .object({
      username: z.string().min(3, { message: t('Имя пользователя должно содержать минимум 3 символа') }),
      password: z.string().min(6, { message: t('Пароль должен содержать минимум 6 символов') }),
      confirmPassword: z.string().min(6, { message: t('Пароль должен содержать минимум 6 символов') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('Пароли не совпадают'),
      path: ['confirmPassword'],
    })

type SignupFormData = {
  username: string
  password: string
  confirmPassword: string
}

export const SignupPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [serverError, setServerError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const schema = useMemo(() => buildSignupSchema(t), [t])
  const resolver = useMemo(() => zodResolver(schema), [schema])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver,
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignupFormData) => {
    setServerError('')
    setIsLoading(true)

    try {
      const response = await AuthService.signup({
        username: data.username,
        password: data.password,
      })

      localStorage.setItem('token', response.token)
      dispatch(setUsername(response.username))
      navigate('/')
    } catch (error: any) {
      if (error.response?.status === 409) {
        setServerError(t('Это имя пользователя уже занято'))
      } else {
        setServerError(t('Ошибка регистрации. Попробуйте позже'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>{t('Регистрация')}</h2>

        {serverError && (
          <Alert
            message={serverError}
            type="error"
            showIcon
            closable
            onClose={() => setServerError('')}
            style={{ marginBottom: '16px' }}
          />
        )}

        <label className={styles.label}>{t('Имя пользователя')}</label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t('Минимум 3 символа')}
              disabled={isLoading}
              status={errors.username ? 'error' : ''}
            />
          )}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username.message?.toString()}</p>
        )}

        <label className={styles.label}>{t('Пароль')}</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder={t('Минимум 6 символов')}
              disabled={isLoading}
              status={errors.password ? 'error' : ''}
            />
          )}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message?.toString()}</p>
        )}

        <label className={styles.label}>{t('Повторите пароль')}</label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder={t('Повторите пароль')}
              disabled={isLoading}
              status={errors.confirmPassword ? 'error' : ''}
            />
          )}
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message?.toString()}</p>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className={styles.button}
          block
          loading={isLoading}
          disabled={isLoading}
        >
          {t('Зарегистрироваться')}
        </Button>

        <div className={styles.footer}>
          <span>{t('Уже есть аккаунт?')}</span>
          <Button type="link" onClick={handleLoginClick}>
            {t('Войти')}
          </Button>
        </div>
      </form>
    </div>
  )
}

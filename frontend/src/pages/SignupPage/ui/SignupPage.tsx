import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Alert } from 'antd'
import { useState, useMemo, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useAppDispatch } from '@app/store'

import { setAuthUser } from '@features/auth'
import { useAuthSignup } from '@features/auth'
import { useHeaderConfig } from '@widgets/chatHeader'

import styles from './SignupPage.module.scss'

const buildSignupSchema = (t: (key: string, options?: Record<string, unknown>) => string) =>
  z
    .object({
      username: z
        .string()
        .min(3, {
          message: t('От {{minSymbols}} до {{maxSymbols}} символов', {
            minSymbols: 3,
            maxSymbols: 20,
          }),
        })
        .max(20, {
          message: t('От {{minSymbols}} до {{maxSymbols}} символов', {
            minSymbols: 3,
            maxSymbols: 20,
          }),
        }),
      password: z
        .string()
        .min(6, { message: t('Не менее {{minSymbols}} символов', { minSymbols: 6 }) }),
      confirmPassword: z
        .string()
        .min(6, { message: t('Не менее {{minSymbols}} символов', { minSymbols: 6 }) }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('Пароли должны совпадать'),
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
  const { mutateAsync: signUp } = useAuthSignup()
  const { resetHeaderConfig } = useHeaderConfig()

  const schema = useMemo(() => buildSignupSchema(t), [t])
  const resolver = useMemo(() => zodResolver(schema), [schema])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    resetHeaderConfig()
  }, [resetHeaderConfig])

  const onSubmit = async (data: SignupFormData) => {
    setServerError('')
    setIsLoading(true)

    try {
      const response = await signUp({
        username: data.username,
        password: data.password,
      })

      dispatch(setAuthUser({ token: response.token, username: response.username }))
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
    navigate('/login') // TODO вынести названия роутов в константы
  }

  const handleFormSubmit = handleSubmit(onSubmit)

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h2 className={styles.title}>{t('Регистрация')}</h2>

        {serverError && (
          <Alert
            message={serverError}
            type="error"
            showIcon
            closable
            onClose={() => setServerError('')}
            className={styles.alert}
          />
        )}

        <label className={styles.label}>{t('Имя пользователя')}</label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t('От {{minSymbols}} до {{maxSymbols}} символов', {
                minSymbols: 3,
                maxSymbols: 20,
              })}
              disabled={isLoading}
              status={errors.username ? 'error' : ''}
            />
          )}
        />
        {errors.username && <p className={styles.error}>{errors.username.message?.toString()}</p>}

        <label className={styles.label}>{t('Пароль')}</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder={t('Не менее {{minSymbols}} символов', { minSymbols: 6 })}
              disabled={isLoading}
              status={errors.password ? 'error' : ''}
            />
          )}
        />
        {errors.password && <p className={styles.error}>{errors.password.message?.toString()}</p>}

        <label className={styles.label}>{t('Подтвердите пароль')}</label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder={t('Подтвердите пароль')}
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

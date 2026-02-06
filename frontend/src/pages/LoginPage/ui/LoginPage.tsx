import { Input, Button, Alert } from 'antd'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import type { SubmitHandler, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@app/store'
import { useAuthLogin, setAuthUser, setError as setAuthError, clearError } from '@features/auth'
import { useHeaderConfig } from '@widgets/chatHeader'

import styles from './LoginPage.module.scss'

type LoginFormData = FieldValues & {
  username: string
  password: string
}

export const LoginPage = () => {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { mutateAsync: login } = useAuthLogin()
  const { resetHeaderConfig } = useHeaderConfig()

  useEffect(() => {
    resetHeaderConfig()
  }, [resetHeaderConfig])

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setLoading(true)
      setErrorMessage(null)
      dispatch(clearError())

      const response = await login({
        username: data.username,
        password: data.password,
      })

      dispatch(setAuthUser({ token: response.token, username: response.username }))
      navigate('/')
    } catch (error: any) {
      let message = t('Не удалось выполнить вход. Попробуйте еще раз.')

      if (error.response?.status === 401) {
        message = t('Неверные имя пользователя или пароль')
      } else if (error.response?.data?.message) {
        message = error.response.data.message
      } else if (error.message) {
        message = error.message
      }

      setErrorMessage(message)
      dispatch(setAuthError(message))
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = handleSubmit(onSubmit)

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h2 className={styles.title}>{t('Вход')}</h2>

        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            closable
            onClose={() => setErrorMessage(null)}
            style={{ marginBottom: '16px' }}
          />
        )}

        <label className={styles.label}>{t('Ваш ник')}</label>
        <Controller
          name="username"
          control={control}
          rules={{ required: t('Ваш ник') }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t('Ваш ник')}
              disabled={loading}
              status={errors.username ? 'error' : ''}
            />
          )}
        />
        {errors.username && <p className={styles.error}>{errors.username.message?.toString()}</p>}

        <label className={styles.label}>{t('Пароль')}</label>
        <Controller
          name="password"
          control={control}
          rules={{ required: t('Введите пароль') }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="••••••••"
              disabled={loading}
              status={errors.password ? 'error' : ''}
            />
          )}
        />
        {errors.password && <p className={styles.error}>{errors.password.message?.toString()}</p>}

        <Button
          type="primary"
          htmlType="submit"
          className={styles.button}
          block
          loading={loading}
          disabled={loading}
        >
          {t('Войти')}
        </Button>

        <div className={styles.footer}>
          <span>{t('Нет аккаунта?')}</span>
          <Button
            type="link"
            onClick={() => {
              navigate('/signup')
            }}
          >
            {t('Зарегистрироваться')}
          </Button>
        </div>
      </form>
    </div>
  )
}

import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form'
import { Input, Button, Alert } from 'antd'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AuthService, setAuthUser, setError as setAuthError, clearError } from '@/features/auth'
import styles from './LoginPage.module.scss'

interface LoginFormData extends FieldValues {
  username: string
  password: string
}

// Компонент страницы входа
export const LoginPage: FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Обработчик отправки формы
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setLoading(true)
      setErrorMessage(null)
      dispatch(clearError())

      // Отправляем учетные данные на сервер
      const response = await AuthService.login({
        username: data.username,
        password: data.password,
      })

      // Сохраняем токен в localStorage и имя пользователя в Redux
      dispatch(setAuthUser({ token: response.token, username: response.username }))

      // Переходим на главную страницу (чат)
      navigate('/')
    } catch (error: any) {
      // Обработка ошибок авторизации
      let message = 'Не удалось выполнить вход. Попробуйте еще раз.'

      if (error.response?.status === 401) {
        message = 'Неправильное имя пользователя или пароль'
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

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Вход</h2>

        {/* Сообщение об ошибке */}
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

        {/* Поле для имени пользователя */}
        <label className={styles.label}>Имя пользователя</label>
        <Controller
          name="username"
          control={control}
          rules={{ required: 'Введите имя пользователя' }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="admin"
              disabled={loading}
              status={errors.username ? 'error' : ''}
            />
          )}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username.message?.toString()}</p>
        )}

        {/* Поле для пароля */}
        <label className={styles.label}>Пароль</label>
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Введите пароль' }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="••••••••"
              disabled={loading}
              status={errors.password ? 'error' : ''}
            />
          )}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message?.toString()}</p>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className={styles.button}
          block
          loading={loading}
          disabled={loading}
        >
          Войти
        </Button>
      </form>
    </div>
  )
}

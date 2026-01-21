import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Alert } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { AuthService } from '@features/auth/api/authService'
import { useAppDispatch } from '@app/store'
import { setUsername } from '@features/auth'
import styles from './SignupPage.module.scss'

const signupSchema = z
  .object({
    username: z.string().min(3, 'Имя пользователя должно содержать минимум 3 символа'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

type SignupFormData = z.infer<typeof signupSchema>

export const SignupPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
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
      navigate('/') // TODO вынести все роуты в константы
    } catch (error: any) {
      if (error.response?.status === 409) {
        setServerError('Это имя пользователя уже занято')
      } else {
        setServerError('Ошибка регистрации. Попробуйте позже')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginClick = () => {
    navigate('/login') // TODO вынести все роуты в константы
  }

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <h1 className={styles.title}>Регистрация</h1>

        {serverError && (
          <Alert title={serverError} type="error" showIcon style={{ marginBottom: '16px' }} />
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Имя пользователя</label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Минимум 3 символа"
                  disabled={isLoading}
                  status={errors.username ? 'error' : ''}
                />
              )}
            />
            {errors.username && (
              <span className={styles.errorText}>{errors.username.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Пароль</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Минимум 6 символов"
                  disabled={isLoading}
                  status={errors.password ? 'error' : ''}
                  suffix={
                    <button
                      type="button"
                      className={styles.toggleButton}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </button>
                  }
                />
              )}
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Повторите пароль</label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Повторите пароль"
                  disabled={isLoading}
                  status={errors.confirmPassword ? 'error' : ''}
                  suffix={
                    <button
                      type="button"
                      className={styles.toggleButton}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </button>
                  }
                />
              )}
            />
            {errors.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword.message}</span>
            )}
          </div>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            disabled={isLoading}
            loading={isLoading}
            style={{ marginTop: '24px' }}
          >
            Зарегистрироваться
          </Button>
        </form>

        <div className={styles.footer}>
          <span>Уже есть аккаунт?</span>
          <Button type="link" onClick={handleLoginClick}>
            Войти
          </Button>
        </div>
      </div>
    </div>
  )
}

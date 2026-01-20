import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form'
import { Input, Button } from 'antd'
import { FC } from 'react'

import styles from './LoginPage.module.scss'

interface LoginFormData extends FieldValues {
  email: string
  password: string
}

export const LoginPage: FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>()
    
    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        console.log('Login data:', data)
        alert('Submitted: ' + JSON.stringify(data))
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.title}>Sign in</h2>

                <label className={styles.label}>Email</label>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => <Input {...field} placeholder="you@example.com" />}
                />
                {errors.email && <p className={styles.error}>{errors.email.message?.toString()}</p>}

                <label className={styles.label}>Password</label>
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => <Input.Password {...field} placeholder="••••••••" />}
                />
                {errors.password && <p className={styles.error}>{errors.password.message?.toString()}</p>}

                <Button type="primary" htmlType="submit" className={styles.button} block>
                    Sign in
                </Button>
            </form>
        </div>
    )
}

export default LoginPage

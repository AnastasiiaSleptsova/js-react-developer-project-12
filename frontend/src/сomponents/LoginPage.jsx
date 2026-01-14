import { useForm, Controller } from 'react-hook-form'
import { Input, Button } from 'antd'

import styles from './LoginPage.module.scss'

export const LoginPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
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
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}

                <label className={styles.label}>Password</label>
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => <Input.Password {...field} placeholder="••••••••" />}
                />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}

                <Button type="primary" htmlType="submit" className={styles.button} block>
                    Sign in
                </Button>
            </form>
        </div>
    )
}

export default LoginPage
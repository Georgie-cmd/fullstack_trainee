import styles from '../styles/pages/signin.module.css';
import { Link } from 'react-router-dom';



export default function SignIn() {
    return (
        <div className={styles.signin}>
            <div className={styles.form}>
                <input 
                    type='email'
                    required
                    placeholder='Email...'
                />

                <input
                    type='text'
                    required
                    placeholder='Password...'
                />
                <button type='button'> SignIn</button>
            </div>

            <div className={styles.signup}>
                <h2>Do you not have an account?</h2>
                <h3>Let's get it know!</h3>
                <Link to='/registration'>
                    <button type='button'>SignUp</button>
                </Link>
            </div>
        </div> 
    )
}
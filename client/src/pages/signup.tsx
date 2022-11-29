import '../styles/main.css';
import styles from '../styles/pages/signup.module.css';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function SignUp(event: any) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        role_in_company: '',
        email: '',
        password: '',
        password_confirmation: ''       
    })
    const [{loading, error}, setState] = useState({loading: false, error: ''})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()


    async function submitForm(event: any) {
        event.preventDefault()

        setState({loading: true, error: ''})
        const response = await fetch(`http://localhost:2022/registration`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        await response.json()

        if(response.status === 200) {
            setIsLoggedIn(true)
            setState({loading: false, error: ''})
        } else {
            setState({loading: false, error: 'error'})
        }

        event.target.reset()
    }


    useEffect(() => {
        if(loading === false && isLoggedIn === true) {
            navigate('/authenctification')
        } else if(loading === false && error !== '') {
            navigate('/error')
        }
    }, [isLoggedIn, loading])



    return (
        <div className={styles.signup}>
            <div className={styles.from}>
                <input 
                    type='text'
                    required
                    placeholder='First name...'

                />
                <input 
                    type='text'
                    required
                    placeholder='Last name...'
                />
                <input 
                    type='text'
                    required
                    placeholder="Company's role..."
                />
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
                <input 
                    type='text'
                    required
                    placeholder='Confirm password...'
                />
                
                <button>SignUp</button>
            </div>

            <div className={styles.signin}>
                <h2>Have you already had and account?</h2>
                <h3>Let's sign in!</h3>
                <Link to='/'>
                    <button type='button'>
                    {!loading ? 'SignUp' : 'Loading...'}
                    </button>
                </Link>
            </div>
        </div>
    )
}
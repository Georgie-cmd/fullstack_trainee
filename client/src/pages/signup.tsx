import '../styles/main.css';
import styles from '../styles/pages/signup.module.css';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



export default function SignUp() {
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
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formData)
        })
        await response.json()
            
        if(response.status === 200) {
            setIsLoggedIn(true)
            setState({loading: false, error: ''})
        } else {
            setState({loading: false, error: 'error'})
        }

        //event.target.reset()
    }


    useEffect(() => {
        if(loading === false && isLoggedIn === true) {
            navigate('/authenctification')
        } else if(loading === false && error !== '') {
            navigate('/error')
        }
    }, [isLoggedIn, loading])


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormData({...formData, [event.target.name]: event.target.value})
    }



    return (
        <div className={styles.signup}>
            <div className={styles.from}>
                <input 
                    type='text'
                    name='first_name'
                    required
                    placeholder='First name...'
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='last_name'
                    required
                    placeholder='Last name...'
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='role_in_company'
                    required
                    placeholder="Role in the company..."
                    onChange={handleChange}
                />
                <input 
                    type='email'
                    name='email'
                    required
                    placeholder='Email...'
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='password'
                    required
                    placeholder='Password...'
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='password_confirmation'
                    required
                    placeholder='Confirm password...'
                    onChange={handleChange}
                />
                
                <button
                    onClick={submitForm}
                >
                    {!loading ? 'SignUp' : 'Loading...'}
                </button>

            </div>

            <div className={styles.signin}>
                <h2>Have you already had an account?</h2>
                <h3>Let's sign in!</h3>
                <Link to='/'>
                    <button type='button'>
                        SignIn
                    </button>
                </Link>
            </div>
        </div>
    )
}
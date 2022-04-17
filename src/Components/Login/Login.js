import { useRef } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase-init';
import CustomLink from '../CustomLink/CustomLink';
import Menubar from '../Menubar/Menubar';
import SocialSignIn from '../SocialSignIn/SocialSignIn';
import './Login.css'

const Login = () => {
    const emailRef = useRef('')
    const passwordRef = useRef('')

    const navigate = useNavigate()

    const location = useLocation()
    let from = location.state?.from?.pathname || "/checkout";

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const handleLogin = (event) => {
        event.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        signInWithEmailAndPassword(email, password)
    }
    if (user) {
        navigate(from, { replace: true })
    }
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const resetPassword = async () => {
        const email = emailRef.current.value
        await sendPasswordResetEmail(email);
        alert('Sent Email . Please check your email dear.');
    }

    let errorElement
    if (error) {
        errorElement = <p style={{ fontSize: '10px', color: 'red' }} className='d-flex justify-content-center'>Error: {error.message}</p>
    }

    if (loading) {
        return <p className='text-center text-warning'>Loading...</p>;
    }
    return (
        <div>
            <Menubar></Menubar>
            <div className='login-container'>
                <form onSubmit={handleLogin} className='login mt-5 p-3 shadow'>
                    <h3 className='text-center mt-3 text-primary'>Login</h3>
                    <div className='d-flex justify-content-center flex-column line mt-4'>
                        <label htmlFor="email">Email</label> <br />
                        <input ref={emailRef} type="email" name="" id="1" required />
                    </div>
                    <div className='d-flex justify-content-center flex-column line mt-4'>
                        <label htmlFor="email">Password</label> <br />
                        <input ref={passwordRef} type="password" name="" id="2" required />
                    </div>
                    <button className='container border-0 mt-4 btn-primary'>Login</button>
                    <div className='d-flex justify-content-center font mt-2'>
                        <small>New to gym trainer?</small><CustomLink className='link-color ms-2 fw-bold' to='/signUp'>Create new Account</CustomLink>
                    </div>
                    <div className='d-flex justify-content-center align-items-center font'>
                        <small>Forget Password?</small>
                        <button onClick={resetPassword} className='link-color ms-2 fw-bold border-0 bg-white'>Forget Password</button>
                    </div>
                    {errorElement}
                    <div className='d-flex justify-content-around'>
                        <hr />
                        or
                        <hr />
                    </div>
                    <SocialSignIn></SocialSignIn>
                </form>

            </div>
        </div>
    );
};
export default Login;
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import auth from '../../firebase.init'
import Loading from '../Shared/Loading'
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import './login.css'

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);


    let signInError;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user || gUser) {
            navigate(from, { replace: true });
            toast.success("You are logged in")
        }
    }, [user, gUser, from, navigate])

    if (loading || gLoading) {
        return <Loading></Loading>
    }

    if (error || gError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    }
    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample" />
                </MDBCol>
                <MDBCol col='4' md='6'>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                        <MDBBtn floating size='md' tag='a' className='me-2' onClick={() => signInWithGoogle()}>
                            <MDBIcon fab icon='google' />
                        </MDBBtn>
                    </div>
                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Email address'
                            id='formControlLg'
                            type='email'
                            size="lg"
                            defaultValue="admin@example.com"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                }
                            })}
                            isInvalid={!!errors.email}
                        />
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                        <MDBInput
                            wrapperClass='mb-4'
                            label='Password'
                            id='formControlLg'
                            type='password'
                            size="lg"
                            defaultValue="admin12"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer'
                                }
                            })}
                            isInvalid={!!errors.password}
                        />
                        {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}

                        {signInError}

                        <div className="d-flex justify-content-between mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">Forgot password?</a>
                        </div>

                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg' type="submit">Login</MDBBtn>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to='/signup' className="link-danger">Register</Link></p>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;
import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithGoogle,
    useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    let signInError;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (loading || gLoading || updating) {
        return <Loading></Loading>;
    }

    if (error || gError || updateError) {
        signInError = <p className="text-red-500"><small>{error?.message || gError?.message || updateError?.message}</small></p>;
    }

    if (user || gUser) {
        navigate(from, { replace: true });
        toast.success("Signed in successfully");
    }

    const imageStorageKey = '4295ac4d47b569312bea67b440cdbdbb';

    const onSubmit = async (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    const img = result.data.url;
                    createUserWithEmailAndPassword(data.email, data.password)
                        .then(async (userCredential) => {
                            const user = userCredential.user;
                            await updateProfile({ displayName: data.displayName, photoURL: img });
                            console.log(user);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else {
                    console.error('Failed to upload image');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
                </MDBCol>
                <MDBCol col='4' md='6'>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <p className="lead fw-normal mb-0 me-3">Sign up with</p>
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
                            label='Full Name'
                            id='formControlLg'
                            type='text'
                            size="lg"
                            {...register("displayName", {
                                required: {
                                    value: true,
                                    message: 'Name is Required',
                                },
                            })}
                            isInvalid={!!errors.displayName}
                        />
                        {errors.displayName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.displayName.message}</span>}

                        <MDBInput
                            wrapperClass='mb-4'
                            label='Email address'
                            id='formControlLg'
                            type='email'
                            size="lg"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required',
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email',
                                },
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
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required',
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer',
                                },
                            })}
                            isInvalid={!!errors.password}
                        />
                        {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}

                        <MDBInput
                            wrapperClass='mb-4'
                            id='formControlLg'
                            type='file'
                            size="lg"
                            accept='image/*'
                            {...register("image", {
                                required: {
                                    value: true,
                                    message: 'Image is Required',
                                },
                            })}
                            isInvalid={!!errors.image}
                        />
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}

                        {signInError}

                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg' type="submit">Sign Up</MDBBtn>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <Link to='/login' className="link-danger">Login</Link></p>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Signup;
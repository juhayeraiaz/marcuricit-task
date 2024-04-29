import React from 'react';
import logo from '../../Images/user.png';
import google from '../../Images/google.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithGoogle,
    useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init'
import Loading from '../Shared/Loading'
import { toast } from 'react-toastify';

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
                            console.log(user)
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
        <div>
            <div className="flex items-center justify-center">
                <div className="relative h-full lg:w-6/12">
                    <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
                        <div className="space-y-4">
                            <Link to="/">
                                <img src={logo} className="w-40" alt="Marcuric Logo" />
                            </Link>
                            <p className="font-medium text-lg">Welcome to MarcuricIT ! Signup first</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 py-6">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Full name"
                                    className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                                    {...register("displayName", {
                                        required: {
                                            value: true,
                                            message: 'Name is Required',
                                        },
                                    })}
                                />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
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
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="flex flex-col items-end">
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
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
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-secondary hover:file:bg-violet-200 file:cursor-pointer cursor-pointer"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: 'Image is Required',
                                        },
                                    })}
                                />
                                <label className="label">
                                    {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                                </label>
                            </div>
                            {signInError}
                            <input className="w-full px-6 py-3 my-4 rounded-lg btn btn-primary" type="submit" value="Sign Up" />
                        </form>
                        <Link to="/login" className="text-sm">
                            Already a user?
                        </Link>
                        <div className="divider my-8 lg:mt-12">OR</div>
                        <div className="mt-12 w-full">
                            <button
                                className="h-12 px-6 border border-blue-100 rounded-lg bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200 w-full"
                                onClick={() => signInWithGoogle()}
                            >
                                <div className="flex items-center space-x-4 justify-center">
                                    <img src={google} className="w-5" alt="" />
                                    <span className="block w-max font-medium tracking-wide text-sm text-blue-700">Sign In with Google</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
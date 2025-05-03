import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Register = () => {
    const [nameError, setNameError] = useState("");

    const navigate = useNavigate();

    const { createUser, setUser, updateUser } = use(AuthContext);
    const handleRegister = (e) => {
        e.preventDefault();
        // console.log(e.target.name.value)
        const form = e.target;
        const name = form.name.value;
        if (name.length < 5) {
            setNameError("Nmae should be more then 5 character.");
            return;
        } else {
            setNameError("");
        }
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        //console.log(name,photo,email,password)
        createUser(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                updateUser({
                    displayName: name,
                    photoURL: photo
                }).then(() => {
                    setUser({
                        ...user,
                        displayName: name,
                        photoURL: photo
                    });
                    navigate("/");
                }).catch((error) => {
                    console.log(error);
                    setUser(user);
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    }
    return (
        <div className='flex justify-center min-h-screen items-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-center text-2xl'>Register your account</h2>
                <form onSubmit={handleRegister} className="card-body">
                    <fieldset className="fieldset">
                        {/* name */}
                        <label className="label">Name</label>
                        <input type="test" name='name' className="input" placeholder="Name" required />
                        {
                            nameError && <p className='text-xs text-error'>{nameError}</p>
                        }

                        {/* Photo Url */}
                        <label className="label">Photo URL</label>
                        <input type="test" name='photo' className="input" placeholder="Photo URL" required />

                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" required />

                        {/* password */}
                        <label className="label">Password</label>
                        <input name='password' type="password" className="input" placeholder="Password" required />

                        <button type='submit' className="btn btn-neutral mt-4">Register</button>
                        <p className='font-semibold text-center pt-5'>Already Have An Account ? <Link className='text-secondary' to="/auth/login">Login</Link> </p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;
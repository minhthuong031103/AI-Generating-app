import { Link, useNavigate } from 'react-router-dom';
import { bgregister } from '../assets';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { registerUser } from '../helper/helper';
export default function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',

      confirmPassword: '',
    },

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async function (values) {
      try {
        if (!values.name) {
          toast.error('Please enter your name!');
          return 0;
        }
        if (!values.email) {
          toast.error('Please enter your email');
          return 0;
        } else {
          if (
            !/^[a-z0-9!'#$%&*+\/=?^_`{|}~-]+(?:\.[a-z0-9!'#$%&*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-zA-Z]{2,}$/i.test(
              values.email
            )
          ) {
            toast.error('Email is invalid!');
            return 0;
          }
        }
        if (!values.password) {
          toast.error('Please enter your password');
          return 0;
        } else {
          const specialChars = /[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
          if (values.password.length < 8) {
            toast.error('Password must have more than 8 characters ');
            return 0;
          }
          if (!specialChars.test(values.password)) {
            toast.error('Password must have at least 1 special character');
            return 0;
          }

          if (values.password.includes(' ')) {
            toast.error('Password is not valid');
            return 0;
          }
        }
        if (!values.confirmPassword) {
          toast.error('Please enter your Confirm password');
          return 0;
        }
        if (values.password != values.confirmPassword) {
          toast.error('Password does not match!');
          return 0;
        }
        let createPromise = await registerUser(values);
        createPromise.then(function (res) {
          if (res === 'Email exist') {
            toast.error('Email existed!');
            return 0;
          }
        });
        await toast.promise(createPromise, {
          loading: 'Registering...',
          success: <b>Register Successfully!</b>,
          error: <b>An error occured, try again</b>,
        });
        navigate('/login');
        console.log(values);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="w-full bg-[#f5f5f5f5] h-screen flex items-start">
        <div className="relative w-1/2 h-full flex flex-col hidden sm:block ">
          <div className="absolute top-[10%] left-[10%] flex flex-col">
            <h1 className="text-4xl text-white font-normal">
              Join the community
            </h1>
            <p className="text-xl text-white font-normal">
              Create your account
            </p>
          </div>
          <img src={bgregister} className="w-full h-full object-cover"></img>
        </div>{' '}
        <div className="w-full sm:w-3/4 h-full flex flex-col p-20 justify-between">
          <h1 className="text-xl text-[#060606] font-semibold">
            Generative AI
          </h1>
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-2xl font-semibold mb-2">Register</h3>
              <p className="text-base mb-2">
                {' '}
                Please enter your details for registration
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full flex flex-col">
                <input
                  {...formik.getFieldProps('name')}
                  type="text"
                  placeholder="Name"
                  className="w-full text-black py-2  my-4 bg-transparent border-b border-black outline-none focus:outline-none"
                ></input>
                <input
                  {...formik.getFieldProps('email')}
                  type="email"
                  placeholder="Email"
                  className="w-full text-black py-2  my-4 bg-transparent border-b border-black outline-none focus:outline-none"
                ></input>

                <input
                  {...formik.getFieldProps('password')}
                  type="password"
                  placeholder="Password"
                  className="w-full text-black py-2  my-4 bg-transparent border-b border-black outline-none focus:outline-none"
                ></input>
                <input
                  {...formik.getFieldProps('confirmPassword')}
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full text-black py-2  my-4 bg-transparent border-b border-black outline-none focus:outline-none"
                ></input>
              </div>
              <button
                type="submit"
                className="w-full text-[#060606] mt-10 my-2 bg-[#F99B7D]
          rounded-md p-4 text-center
           flex items-center justify-center"
              >
                Create account
              </button>
            </form>
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex">
                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"></p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col my-4 ">
            <Link to="/login">
              <button
                className="w-full text-white my-2 bg-[#9BA4B5] 
          rounded-md p-4 text-center 
           flex items-center justify-center"
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

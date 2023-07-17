import { Link, useNavigate } from 'react-router-dom';
import { bg } from '../assets';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { verifyLogin } from '../helper/helper';
export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async function (values) {
      try {
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
        }
        let loginPromise = verifyLogin({
          email: values.email,
          password: values.password,
        });
        await toast.promise(loginPromise, {
          loading: 'Loading...',
          success: 'Login successfully!',
          error: 'Nhà ngươi là aiiii?? Không phải Tuyết Nhi ko đc vô đây',
        });

        loginPromise.then(function (res) {
          let { token, _id } = res.data;
          console.log(token, _id);
          localStorage.setItem('token', token);
          localStorage.setItem('_id', _id);
          navigate('/');
        });
        // var exist = 0;
        // let createPromise = registerUser(values);
        // await createPromise.then(function (res) {
        //   console.log(res);
        //   if (res === 'Email exist') {
        //     toast.error('Email existed!');
        //     exist = 1;
        //   }
        // });
        // if (exist) return 0;
        // await toast.promise(createPromise, {
        //   loading: 'Registering...',
        //   success: <b>Register Successfully!</b>,
        //   error: <b>An error occured, try again</b>,
        // });
        // navigate('/login');
        // console.log(values);
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
          <div className="absolute top-[20%] left-[10%] flex flex-col">
            <h1 className="text-4xl text-white font-normal">
              Turn Your Ideas into reality
            </h1>
            <p className="text-xl text-white font-normal">Let's get started</p>
          </div>
          <img src={bg} className="w-full h-full object-cover"></img>
        </div>{' '}
        <div className="w-full sm:w-3/4 h-full flex flex-col p-20 justify-between">
          <h1 className="text-xl text-[#060606] font-semibold">
            Web này của mthuong
          </h1>
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-2xl font-semibold mb-2">Login</h3>
              <p className="text-base mb-2">
                Welcome! Please enter your details
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full flex flex-col">
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
              </div>
              <button
                type="submit"
                className="w-full text-white my-2 bg-[#060606] 
          rounded-md p-4 text-center
           flex items-center justify-center"
              >
                Log in
              </button>
            </form>
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex">
                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                  <Link to="forgot"> Forgot Password?</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col my-4">
            <Link to={'/register'}>
              <button
                className="w-full text-[#060606] my-2 bg-white border-2 border-black 
          rounded-md p-4 text-center
           flex items-center justify-center"
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

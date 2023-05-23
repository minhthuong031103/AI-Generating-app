import { Link } from 'react-router-dom';
import { bgforgot } from '../assets';

export default function Forgot() {
  return (
    <div className="w-full bg-[#f5f5f5f5] h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col hidden sm:block ">
        <div className="absolute top-[10%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-normal">
            Forgot your password?
          </h1>
          <p className="text-xl text-white font-normal">Let we help you</p>
        </div>
        <img src={bgforgot} className="w-full h-full object-cover"></img>
      </div>{' '}
      <div className="w-full sm:w-3/4 h-full flex flex-col p-20 justify-between">
        <h1 className="text-xl text-[#060606] font-semibold">Generative AI</h1>
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-2xl font-semibold mb-2">Forgot password</h3>
            <p className="text-base mb-2">
              {' '}
              Please enter your email for verification.
              <br />
              We will send you a 6-digit OTP to your email.
            </p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black py-2  my-4 bg-transparent border-b border-black outline-none focus:outline-none"
            ></input>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex">
              <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"></p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col my-4">
          <button
            className="w-full text-white my-2 bg-[#060606] 
          rounded-md p-4 text-center
           flex items-center justify-center"
          >
            Send OTP{' '}
          </button>
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
  );
}

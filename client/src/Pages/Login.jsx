import { bg } from '../assets';

export default function Login() {
  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-normal">
            Turn Your Ideas into reality
          </h1>
          <p className="text-xl text-white font-normal">Let's get started</p>
        </div>
        <img src={bg} className="w-full h-full object-cover"></img>
      </div>
      <div className="w-1/2 h-full bg-[#f5f5f5f5] flex flex-col p-20 justify-between">
        <h1 className="text-xl text-[#060606] font-semibold">Generative AI</h1>
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-2xl font-semibold mb-2">Login</h3>
            <p className="text-base mb-2">Welcome! Please enter your details</p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black py-2  my-4 bg-transparent border-b border-black outline-none focus:outline-none"
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="w-full text-black py-2  my-4 bg-transparent border-b border-black outline-none focus:outline-none"
            ></input>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex">
              <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                Forgot Password?
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Dont have account?{' '}
            <span className="font-semibold underline underline-offset-2 cursor-pointer">
              Sign up for free
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

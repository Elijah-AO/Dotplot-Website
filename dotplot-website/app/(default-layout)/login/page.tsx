import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';

const LoginPage = () => {
  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <SignedOut>
          <div className="flex flex-col items-center justify-center h-screen">
            <SignIn 
            routing="hash" 
             />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="text-center">
          <span className="loading loading-spinner loading-lg scale-150"></span>
          </div>
        </SignedIn>
      </div>
  );
};

export default LoginPage;

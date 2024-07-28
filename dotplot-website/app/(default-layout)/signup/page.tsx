import { SignUp, SignedIn, SignedOut} from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-4">
        <SignedOut>
        <SignUp routing="hash" />
        </SignedOut>
      </div>
      <SignedIn>
          <div className="text-center">
          <span className="loading loading-spinner loading-lg scale-150"></span>
          </div>
        </SignedIn>
    </div>
  );
};

export default SignUpPage;

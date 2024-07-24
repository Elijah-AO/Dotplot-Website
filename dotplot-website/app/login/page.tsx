import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';

const LoginPage = () => {
  return (
    <ClerkProvider>
      <div className="flex flex-col items-center justify-center h-screen">
        <SignedOut>
          <div className="flex flex-col items-center justify-center h-screen">
            <SignIn routing="hash" />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="text-center">
            <p>YOU SIGNED IN</p>
            <UserButton showName />
          </div>
        </SignedIn>
      </div>
    </ClerkProvider>
  );
};

export default LoginPage;

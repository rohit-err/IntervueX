import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

export default function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      {/* <h1 className="text-5xl font-bold text-white">Welcome to homepage!</h1> */}

      <Show when="signed-out">
        <SignInButton mode={"modal"} />
        <SignUpButton mode={"modal"} />
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
}

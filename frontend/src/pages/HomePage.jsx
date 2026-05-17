import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome To InterVueX</h1>
      <Show when={"signed-in"}>
        <UserButton />
      </Show>
      <Show when={"signed-out"}>
        <div className="flex gap-4">
          <SignInButton mode="modal">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-6 py-2 bg-white text-gray-950 hover:bg-gray-200 rounded-lg font-medium transition-colors">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </Show>
    </div>
  );
};

export default HomePage;

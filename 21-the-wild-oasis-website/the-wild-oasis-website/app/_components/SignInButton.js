import Image from "next/image";

function SignInButton() {
  return (
    <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
      <div className="flex-1 relative">
        <Image
          fill
          className="object-cover"
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
      </div>
      <span>Continue with Google</span>
    </button>
  );
}

export default SignInButton;

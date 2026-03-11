import Link from "next/link";

function SignUpSuccessPage() {
  return (
    <div className="flex flex-col">
      verify your Email
      <Link href={"/auth/login"}>Go to Login</Link>
    </div>
  );
}

export default SignUpSuccessPage;

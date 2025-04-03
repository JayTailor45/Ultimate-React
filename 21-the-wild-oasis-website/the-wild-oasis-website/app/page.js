import Link from "next/link";
import Navigation from "./components/Navigation";

export default function Page() {
  return (
    <>
      <h1>The Wild Oasis. Welcome to paradise</h1>
      <Link href="/cabins">Explore luxury cabins</Link>
    </>
  );
}

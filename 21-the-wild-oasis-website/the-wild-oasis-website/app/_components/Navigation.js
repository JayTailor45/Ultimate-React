import Link from "next/link";
import { auth } from "../_libs/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        {
          session?.user?.image ?
            <li>
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors flex items-center gap-4"
              >
                <img className="h-8 rounded-full" src={session?.user?.image} referrerPolicy="no-referrer" />
                <span>Guest Area</span>
              </Link>
            </li>
          :
            <li>
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                Guest area
              </Link>
            </li>

        }
      </ul>
    </nav>
  );
}

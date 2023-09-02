import Image from "next/image";
import { ConnectionIndicator } from "../_components/ConnectionIndicator";
import Link from "next/link";

export default function RoomsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex bg-slate-800 h-24 items-center justify-between px-3 text-slate-100">
        <Link href="/">
          <Image src="/logo.png" width={100} height={100} alt="logo" />
        </Link>
        <ConnectionIndicator />
      </div>
      <div className="px-3 pt-2 h-full">{children}</div>
    </div>
  );
}

"use client";
import { Heart, LogOutIcon, ShoppingBag } from "lucide-react";
import { Button } from "../button";
import Logo from "@/app/assets/svgs/Logo";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logoutUser } from "@/services/authService";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoute } from "@/constant";

export default function Navbar() {
  const { user, setLoading } = useUser();
  const router = useRouter();
  const pathName = usePathname();
  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.success) {
        toast.success(res?.message);

        if (protectedRoute.some((route) => pathName.match(route))) {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
      setLoading(true);
    } catch (err) {
      toast.error("An error occurred while logging out");
    }
  };
  console.log(user);
  return (
    <header className="border-b w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <h1 className="text-2xl font-black flex items-center">
          <Logo />
          Next Mart
        </h1>
        <div className="max-w-md  flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
          />
        </div>
        <nav className="flex gap-2">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <Heart />
          </Button>
          <Button variant="outline" className="rounded-full p-0 size-10">
            <ShoppingBag />
          </Button>
          {!user && (
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                Sign In
              </Button>
            </Link>
          )}

          {user && !user?.hasShop && (
            <Link href="/create-shop">
              <Button className="rounded-full">Create Shop</Button>
            </Link>
          )}
          {user && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  {user?.hasShop && (
                    <DropdownMenuItem>My Shop</DropdownMenuItem>
                  )}
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer bg-red-300"
                  >
                    <LogOutIcon /> <span>Logout</span>{" "}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

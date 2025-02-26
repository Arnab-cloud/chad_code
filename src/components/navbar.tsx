"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const pathName = usePathname();

	const navPath = { link: "/", dp: "Home" };
	switch (pathName) {
		case "/":
			navPath.link = "/addForm";
			navPath.dp = "Add";

			break;

		default:
			break;
	}

	return (
		<nav className="p-3 px-5 shadow-md sticky top-0 bg-white z-10 flex justify-center">
			<div className="container mx-auto flex flex-row justify-between items-center">
				<Link href="/" className="text-xl font-bold mb-4 md:mb-0 ">
					chad code
				</Link>
			</div>
			<div>
				<Button variant="outline" asChild>
					<Link href={navPath.link}>{navPath.dp}</Link>
				</Button>
			</div>
		</nav>
	);
};

export default Navbar;

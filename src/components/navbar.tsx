"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar: React.FC = () => {
	return (
		<nav className="p-3 shadow-md sticky top-0 bg-white z-10 flex flex-row">
			<div className="container mx-auto flex flex-row justify-between items-center">
				<Link href="/" className="text-xl font-bold mb-4 md:mb-0 ">
					chad_code
				</Link>
			</div>
			<div>
				<Button variant="outline" asChild>
					<Link href={"/addForm"}>Add</Link>
				</Button>
			</div>
		</nav>
	);
};

export default Navbar;

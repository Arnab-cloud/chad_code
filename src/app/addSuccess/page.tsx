import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddSuccessPage() {
	return (
		<div className="flex justify-center items-center">
			<div className="mt-48 p-5 w-fit flex justify-center items-center flex-col gap-3">
				<p className="font-semibold text-2xl">
					Code added Successfully!
				</p>
				<div className="flex flex-col md:flex-row gap-5">
					<Button variant={"outline"} asChild>
						<Link href={"/addForm"}>Add Another Code</Link>
					</Button>
					<Button>
						<Link href={"/"}>Go Back Home</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

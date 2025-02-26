import { CForm } from "@/components/cform";
import Navbar from "@/components/navbar";

export default async function AddFrom() {
	return (
		<div className="flex flex-col gap-12">
			<div>
				<Navbar link="/" displayText="Home"></Navbar>
			</div>
			<div className="w-full flex justify-center">
				<CForm></CForm>
			</div>
		</div>
	);
}

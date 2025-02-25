import { CForm } from "@/components/cform";
import Navbar from "@/components/navbar";

export default async function AddFrom() {
	return (
		<div>
			<div>
				<Navbar></Navbar>
			</div>
			<div className="w-full">
				<CForm></CForm>
			</div>
		</div>
	);
}

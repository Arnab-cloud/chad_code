import CodeForm from "@/components/cForm2";

// import { CForm } from "@/components/cform";
export default async function AddFrom() {
	return (
		<div className="flex flex-col gap-12">
			{/* <div>
				<Navbar link="/" displayText="Home"></Navbar>
			</div> */}
			<div className="w-full flex justify-center">
				<CodeForm />
			</div>
		</div>
	);
}

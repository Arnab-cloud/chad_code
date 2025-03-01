import CCard from "@/components/ccard";
import { fileDesc } from "@/models/Codes";

export default async function Home() {
	try {
		const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

		/**
		 * As i passed {cache: "no-store"} as a parameter the problem with the dynamic route is gone. I don't know if that is the reason or some thing else
		 */
		const list = await fetch(`${url}/api/getCodes`, {
			cache: "no-store",
		})
			.then((data) => data.json())
			.then((data) => data.listFiles as [fileDesc]);

		// console.log(list);
		return (
			<div className="flex flex-col">
				{/* <div className="controls">
						<Navbar link="/addForm" displayText="Add"></Navbar>
					</div> */}
				<div className="p-4 flex gap-2 flex-wrap">
					{list &&
						list.map((val, idx) => (
							<div key={idx} className="min-w-36">
								<CCard fileDesc={val}></CCard>
							</div>
						))}
				</div>
			</div>
		);
	} catch (error) {
		console.log("error:", error);

		return <div>No data + error</div>;
	}
}

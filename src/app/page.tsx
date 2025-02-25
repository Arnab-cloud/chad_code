import CCard from "@/components/ccard";
import Navbar from "@/components/navbar";
import { promises as fs } from "fs";

const getFiles = async () => {
	const files = await fs.readdir(process.cwd() + "/public/codes", "utf-8");
	return files;
};

export default async function Home() {
	// await getFiles();
	const files = await getFiles();
	// console.log(files);
	return (
		<div className="flex flex-col">
			<div className="controls">
				<Navbar></Navbar>
			</div>
			<div className="w-full p-4 flex gap-2">
				{files.map((val, idx) => (
					<div key={idx} className="w-52 gap-2">
						<CCard fileName={val}></CCard>
					</div>
				))}
			</div>
		</div>
	);
}

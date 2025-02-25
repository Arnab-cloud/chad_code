import CCard from "@/components/ccard";
import { ApiResponse } from "@/components/cform";
import Navbar from "@/components/navbar";
import axios, { AxiosError } from "axios";

export default async function Home() {
	// await getFiles();
	try {
		const result = await axios.get<ApiResponse>(
			`http://localhost:3000/api/getCodes`
		);

		const filenames = result.data.filenames;
		console.log(filenames);

		return (
			<div className="flex flex-col">
				<div className="controls">
					<Navbar></Navbar>
				</div>
				<div className="w-full p-4 flex gap-2">
					{filenames &&
						filenames.map((val, idx) => (
							<div key={idx} className="w-52 gap-2">
								<CCard fileName={val}></CCard>
							</div>
						))}
				</div>
			</div>
		);
		// console.log("Classes", classes);
	} catch (error) {
		const axiosError = error as AxiosError<ApiResponse>;

		return <div>{axiosError.response?.data.message}</div>;
	}
	// console.log(files);
}

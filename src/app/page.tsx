"use client";
import CCard from "@/components/ccard";
import { ApiResponse } from "@/components/cform";
import Navbar from "@/components/navbar";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
	// await getFiles();
	const [filenames, setFilenames] = useState<{ names: [string] }>();

	const fetchCodes = useCallback(async () => {
		try {
			const result = await axios.get<ApiResponse>(`api/getCodes`);

			console.log("result:", result.data.filenames);
			if (result.data.filenames) {
				setFilenames({ names: result.data.filenames });
			}
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;

			return <div>{axiosError.response?.data.message}</div>;
		}
	}, []);
	// console.log(filenames);
	useEffect(() => {
		fetchCodes();
	}, [fetchCodes]);

	return (
		<div className="flex flex-col">
			<div className="controls">
				<Navbar link="/addForm" displayText="Add"></Navbar>
			</div>
			<div className="p-4 flex gap-2 flex-wrap">
				{filenames?.names &&
					filenames.names.map((val, idx) => (
						<div key={idx} className="min-w-36">
							<CCard fileName={val}></CCard>
						</div>
					))}
			</div>
		</div>
	);
	// console.log("Classes", classes);

	// console.log(files);
}

"use client";
import CodeForm from "@/components/cForm2";
import { ApiResponse } from "@/models/Codes";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { fileDetailsProps } from "../page";

export default function EditPage() {
	const { fid } = useParams<{ fid: string }>();
	const [fileDetails, setFileDetails] = useState<fileDetailsProps>();

	const fetchFileDetails = useCallback(async () => {
		try {
			const res = await axios.get<ApiResponse>(`/api/getData?fid=${fid}`);
			// console.log(res);
			const file = res.data.code;
			if (!file) {
				return <div>Bye</div>;
			}

			setFileDetails({
				filename: file.fileName,
				content: file.content,
				filetype: file.fileType,
				description: file.description,
			});
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;
			console.log("Error happened", error);

			return <div>{axiosError.response?.data.message}</div>;
		}
	}, [fid]);

	useEffect(() => {
		fetchFileDetails();
	}, [fetchFileDetails, fid]);

	if (fileDetails) {
		return (
			<div className="w-screen p-10 flex items-center justify-center">
				{/* <div>
				<Navbar link="/" displayText="Home"></Navbar>
			</div> */}
				<div className="w-full flex justify-center items-center flex-col gap-4">
					<div className="font-semibold text-xl">
						Edit Anything and Submit
					</div>
					<CodeForm
						initialValues={{
							filename: fileDetails.filename,
							language: fileDetails.filetype || "plaintext",
							code: fileDetails.content,
							description: fileDetails.description,
						}}
						id={fid}
					/>
				</div>
			</div>
		);
	}

	return <div>Loading...</div>;
}

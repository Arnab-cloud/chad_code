"use client";
import { ApiResponse } from "@/components/cform";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { dracula, CopyBlock } from "react-code-blocks";

interface fileDetailsProps {
	filename: string;
	filetype?: string;
	content: string;
	description?: string;
}

const CodePage = () => {
	const { filename } = useParams<{ filename: string }>();
	// console.log(params);
	// const [isCopied, setIsCopied] = useState(false);
	const [fileDetails, setFileDetails] = useState<fileDetailsProps>();
	const base_url = process.env.NEXT_PUBLIC_BASE_URL || "";

	const fetchFileDetails = useCallback(async () => {
		try {
			const res = await axios.get<ApiResponse>(
				`${base_url}/api/getData?filename=${filename}`
			);
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
	}, [base_url, filename]);

	useEffect(() => {
		fetchFileDetails();
	}, [fetchFileDetails, filename]);

	if (fileDetails) {
		return (
			<div className="flex flex-col gap-8">
				{/* <div>
					<Navbar link="/addForm" displayText="Add"></Navbar>
				</div> */}
				<div className="flex items-center justify-center p-4">
					<Card className="min-w-96 min-h-36">
						<CardHeader>
							<CardTitle>{fileDetails.filename}</CardTitle>
							<CardDescription>
								{fileDetails.description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<CopyBlock
								text={fileDetails.content}
								language={fileDetails.filetype || "javascript"}
								showLineNumbers={true}
								theme={dracula}
								// copied={isCopied}
								// onCopy={() => {
								// 	setIsCopied(!isCopied);
								// }}
								wrapLongLines
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return <div>Loading...</div>;
};

export default CodePage;

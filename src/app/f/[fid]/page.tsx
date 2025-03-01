"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ApiResponse } from "@/models/Codes";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { dracula, CopyBlock } from "react-code-blocks";

interface fileDetailsProps {
	filename: string;
	filetype?: string;
	content: string;
	description?: string;
}

const CodeBlock = memo(
	({
		content,
		filetype = "javascript",
	}: {
		content: string;
		filetype?: string;
	}) => {
		// const [isCopied, setIsCopied] = useState(false);
		return (
			<CopyBlock
				text={content}
				language={filetype}
				showLineNumbers={true}
				theme={dracula}
				wrapLongLines
			/>
		);
	}
);

const CodePage = () => {
	const { fid } = useParams<{ fid: string }>();
	// console.log(params);
	// const [isCopied, setIsCopied] = useState(false);
	const [fileDetails, setFileDetails] = useState<fileDetailsProps>();
	// const base_url = process.env.NEXT_PUBLIC_BASE_URL || "";

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
							<CodeBlock
								content={fileDetails.content}
								filetype={fileDetails.filetype}
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

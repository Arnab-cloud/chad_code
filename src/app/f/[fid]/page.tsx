"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ApiResponse } from "@/models/Codes";
import axios, { AxiosError } from "axios";
import { Check, CopyIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { dracula, CopyBlock } from "react-code-blocks";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

export interface fileDetailsProps {
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
		const [isCopied, setIsCopied] = useState(false);
		const handleCopy = useCallback(async () => {
			if (navigator.clipboard) {
				await navigator.clipboard
					.writeText(content)
					.then(() => {
						console.log("copied");
						setIsCopied(true);
						setTimeout(() => {
							console.log("reset");
							setIsCopied(false);
						}, 2000);
					})
					.catch(() => {
						toast.error("Failed to copy");
					});
			} else {
				const textArea = document.createElement("textarea");
				textArea.value = content;
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("copy");
				document.body.removeChild(textArea);

				console.log("copied");
				setIsCopied(true);
				setTimeout(() => {
					console.log("reset");
					setIsCopied(false);
				}, 2000);
			}
		}, [content]);
		// console.log(SyntaxHighlighter.supportedLanguages);
		return (
			<div className="relative">
				<SyntaxHighlighter
					language={filetype}
					style={dracula}
					showLineNumbers
					wrapLines
				>
					{content}
				</SyntaxHighlighter>
				<Button className="absolute top-2 right-2" onClick={handleCopy}>
					{isCopied ? <Check /> : <CopyIcon />}
				</Button>
			</div>
		);
	}
);

CodeBlock.displayName = "CodeBlock";

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
							<CardTitle className="flex flex-row items-center justify-between">
								<p>{fileDetails.filename}</p>
								<Button>
									<Link href={`/f/${fid}/editPage`}>
										Edit
									</Link>
								</Button>
							</CardTitle>
							<CardDescription>
								{fileDetails.description}
							</CardDescription>
						</CardHeader>
						<CardContent className="p-2 w-full">
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

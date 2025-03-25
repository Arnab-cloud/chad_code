"use client";
import { ReactNode } from "react";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "./ui/context-menu";
import Link from "next/link";
// import { createHash } from "crypto";
// import axios, { AxiosError } from "axios";
// import { ApiResponse } from "@/models/Codes";
// import { toast } from "sonner";
// import { ContextMenuTrigger } from "@radix-ui/react-context-menu";

// const secret_key = process.env.SECRET_KEY;

// const generateHash = (id: string) => {
// 	console.log("secret key", secret_key);
// 	return createHash("sha256")
// 		.update(id + secret_key)
// 		.digest("hex");
// };

const CardContext: React.FC<{ children: ReactNode; fid: string }> = ({
	children,
	fid,
}) => {
	// const [isProcessing, setIsProcessing] = useState(false);
	// const deleteCode = useCallback(async () => {
	// 	try {
	// 		setIsProcessing(true);
	// 		toast("Deleting file");
	// 		const hashedId = generateHash(fid);
	// 		console.log(hashedId);
	// 		const payload = {
	// 			fid,
	// 			hashedId,
	// 		};
	// 		await axios.post<ApiResponse>(`/api/deleteByUser`, payload);
	// 		toast("File deleted, refresh");
	// 	} catch (error) {
	// 		const axiosError = error as AxiosError<ApiResponse>;
	// 		console.log("error happened deleting the file", error);
	// 		toast(axiosError.response?.data.message);
	// 	} finally {
	// 		setIsProcessing(false);
	// 	}
	// }, []);
	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem
					// onClick={(e) => {
					// 	e.stopPropagation();
					// 	deleteCode();
					// }}
					asChild
				>
					<Link href={`/f/${fid}/editPage`}>Edit</Link>
				</ContextMenuItem>
				<ContextMenuItem
				// onClick={(e) => {
				// 	e.stopPropagation();
				// 	deleteCode();
				// }}
				>
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};

export default CardContext;

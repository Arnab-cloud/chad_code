import { ApiResponse } from "@/components/cform";
import Navbar from "@/components/navbar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import axios, { AxiosError } from "axios";

const CodePage = async ({
	params,
}: {
	params: Promise<{ filename: string }>;
}) => {
	const { filename } = await params;
	try {
		const res = await axios.get<ApiResponse>(
			`api/getData?filename=${filename}`
		);
		// console.log(res);
		const file = res.data.code;
		if (!file) {
			return <div>Bye</div>;
		}

		return (
			<div>
				<div>
					<Navbar></Navbar>
				</div>
				<div className="flex items-center justify-center p-4">
					<Card className="w-fit">
						<CardHeader>
							<CardTitle>{file.fileName}</CardTitle>
							<CardDescription>
								{file.description}
							</CardDescription>
						</CardHeader>
						<CardContent>{file.content}</CardContent>
					</Card>
				</div>
			</div>
		);
	} catch (error) {
		const axiosError = error as AxiosError<ApiResponse>;

		return <div>{axiosError.response?.data.message}</div>;
	}

	// console.log(file);
};

export default CodePage;

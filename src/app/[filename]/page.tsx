import Navbar from "@/components/navbar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { promises as fs } from "fs";

const CodePage = async ({
	params,
}: {
	params: Promise<{ filename: string }>;
}) => {
	const { filename } = await params;
	const file = await fs
		.readFile(
			process.cwd() + "/public/codes/" + `${filename}` + ".json",
			"utf-8"
		)
		.then((data) => JSON.parse(data))
		.catch((err) => console.log(err));

	// console.log(file);

	return (
		<div>
			<div>
				<Navbar></Navbar>
			</div>
			<div className="flex items-center justify-center p-4">
				<Card className="w-fit">
					<CardHeader>
						<CardTitle>{file.filename}</CardTitle>
						<CardDescription>{file.description}</CardDescription>
					</CardHeader>
					<CardContent>{file.content}</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default CodePage;

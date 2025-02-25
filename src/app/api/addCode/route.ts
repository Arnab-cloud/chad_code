import { promises as fs } from "fs";

export async function POST(request: Request) {
	const { filename, content, description } = await request.json();

	const values_to_be_written = {
		filename,
		content,
		description,
		dateCreated: Date.now(),
	};

	console.log(filename);

	await fs.writeFile(
		process.cwd() +
			"/public/codes/" +
			filename.substring(0, filename.indexOf(".")) +
			".json",
		JSON.stringify(values_to_be_written)
	);
	return Response.json({
		success: true,
		message: "file added",
	});
}

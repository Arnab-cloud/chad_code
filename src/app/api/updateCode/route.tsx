import dbConnect from "@/lib/dbConnect";
import CodesModel from "@/models/Codes";

export async function POST(request: Request) {
	const { id, filename, language, code, description } = await request.json();
	// console.log(filename, language, code, description);

	try {
		await dbConnect();
		const file_old = await CodesModel.findOneAndUpdate(
			{ _id: id },
			{
				fileName: filename,
				content: code,
				description: description,
				fileType: language,
			}
		);

		if (!file_old) {
			// console.log(file_old);
			return Response.json(
				{
					success: false,
					message: "No such file exists",
				},
				{ status: 404 }
			);
		}

		return Response.json(
			{
				success: true,
				message: "code updated successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error updating code", error);
		console.log("filename: ", filename);
		return Response.json(
			{
				success: false,
				message: "Error updating code",
			},
			{ status: 400 }
		);
	}
}

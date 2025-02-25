import dbConnect from "@/lib/dbConnect";
import CodesModel from "@/models/Codes";

export async function POST(request: Request) {
	const { filename, content, description } = await request.json();

	try {
		await dbConnect();
		const file_old = await CodesModel.findOne({
			fileName: filename,
		});
		if (file_old) {
			return Response.json(
				{
					success: false,
					message: "Already exists",
				},
				{ status: 401 }
			);
		}

		const newfile = new CodesModel({
			fileName: filename,
			content,
			description,
		});

		await newfile.save();

		return Response.json(
			{
				success: true,
				message: "code added successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error adding code", error);
		return Response.json(
			{
				success: false,
				message: "Error adding code",
			},
			{ status: 400 }
		);
	}
}

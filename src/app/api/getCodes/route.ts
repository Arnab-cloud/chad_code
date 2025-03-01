import dbConnect from "@/lib/dbConnect";
import CodesModel from "@/models/Codes";

export async function GET() {
	try {
		await dbConnect();

		const codes = await CodesModel.find(
			{},
			{ content: 0, __v: 0, createdAt: 0 }
		).sort({
			createdAt: "desc",
		});
		if (!codes) {
			return Response.json(
				{
					success: false,
					message: "User not found",
				},
				{ status: 401 }
			);
		}

		const res = codes.map((val) => {
			return {
				fId: val._id,
				filename: val.fileName,
				filetype: val.fileType,
				description: val.description,
			};
		});
		// console.log(classDetails);

		return Response.json(
			{
				success: true,
				message: "classes acquired",
				listFiles: res,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error getting files", error);
		return Response.json(
			{
				success: false,
				message: "Error getting files",
			},
			{ status: 500 }
		);
	}
}

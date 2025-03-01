import dbConnect from "@/lib/dbConnect";
import CodesModel from "@/models/Codes";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const fId = searchParams.get("fid");
		// console.log("from api", name);
		await dbConnect();

		const codes = await CodesModel.findOne({ _id: fId });
		if (!codes) {
			return Response.json(
				{
					success: false,
					message: "file not found",
				},
				{ status: 401 }
			);
		}

		return Response.json(
			{
				success: true,
				message: "classes acquired",
				code: codes,
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

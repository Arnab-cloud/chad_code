import dbConnect from "@/lib/dbConnect";
import CodesModel from "@/models/Codes";

export async function GET(request: Request) {
	try {
		// const {filename} = params;

		// console.log("is is even happening");
		// Create a URL object to extract query parameters
		const { searchParams } = new URL(request.url);
		const name = searchParams.get("filename");
		// console.log("from api", name);
		await dbConnect();

		const codes = await CodesModel.findOne({ fileName: name });
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

import dbConnect from "@/lib/dbConnect";
import CodesModel from "@/models/Codes";

export async function GET() {
	try {
		await dbConnect();

		const codes = await CodesModel.find({}, "fileName");
		if (!codes) {
			return Response.json(
				{
					success: false,
					message: "User not found",
				},
				{ status: 401 }
			);
		}

		const res = codes.map((val) => val.fileName);
		console.log(res);
		// console.log(classDetails);

		return Response.json(
			{
				success: true,
				message: "classes acquired",
				filenames: res,
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

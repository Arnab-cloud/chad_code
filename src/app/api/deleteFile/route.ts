import dbConnect from "@/lib/dbConnect";
import CodesModel from "@/models/Codes";

export async function POST(request: Request) {
	const { fid } = await request.json();

	try {
		dbConnect();
		const res = await CodesModel.deleteOne({ _id: fid.toString() });
		if (res.acknowledged) {
			return Response.json(
				{
					success: true,
					message: `File deleted successfully, No of files deleted ${res.deletedCount}`,
				},
				{ status: 200 }
			);
		}
		console.log(res);
		return Response.json(
			{
				success: false,
				message: "Not acknowledged",
			},
			{ status: 400 }
		);
	} catch (error) {
		console.log("Error deleting the file with id:", fid, "error: ", error);
		return Response.json(
			{
				success: false,
				message: "Some error happened",
			},
			{ status: 400 }
		);
	}
}

import { ApiResponse } from "@/models/Codes";
import axios, { AxiosError } from "axios";
import { createHash } from "crypto";

const secret_key = process.env.SECRET_KEY;

export async function POST(request: Request) {
	const { fid, hashedId } = (await request.json()) as {
		fid: string;
		hashedId: string;
	};
	console.log(fid, hashedId);
	const newHashedKey = createHash("sha256")
		.update(fid + secret_key)
		.digest("hex");
	console.log(secret_key, newHashedKey);
	try {
		if (hashedId !== newHashedKey) {
			return Response.json(
				{
					success: true,
					message: "Not authenticated",
				},
				{ status: 401 }
			);
		}
		const res = await axios.post<ApiResponse>("/api/deleteFile", fid);

		return Response.json(res.data, { status: res.status });
	} catch (error) {
		const axiosError = error as AxiosError<ApiResponse>;
		console.log(
			"Error authenticating user",
			axiosError.response?.data.message
		);
	}
}

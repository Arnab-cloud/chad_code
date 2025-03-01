import mongoose, { Document, Schema } from "mongoose";
export interface CodeFile extends Document {
	fileName: string;
	fileType: string;
	content: string;
	description?: string;
	createdAt: Date;
}

export interface ApiResponse {
	success: boolean;
	message: string;
	listFiles?: [fileDesc];
	code?: CodeFile;
}

export interface fileContent {
	filename: string;
	content: string;
	description?: string;
	filetype: string;
}

export interface fileDesc {
	fId: string;
	filename: string;
	filetype: string;
	description?: string;
}

const FilesSchema: Schema<CodeFile> = new Schema({
	fileName: {
		type: String,
		required: [true, "filename is required"],
		trim: true,
	},
	fileType: {
		type: String,
		required: [true, "filename is required"],
		trim: true,
	},
	content: {
		type: String,
		required: [true, "content is required"],
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

const CodesModel =
	(mongoose.models.Files as mongoose.Model<CodeFile>) ||
	mongoose.model("Files", FilesSchema);
export default CodesModel;

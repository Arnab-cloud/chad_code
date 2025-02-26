import mongoose, { Document, Schema } from "mongoose";
export interface CodeFile extends Document {
	fileName: string;
	fileType: string;
	content: string;
	description?: string;
	createdAt: Date;
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

"use client";
import React, { useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import SelectOptions from "@/components/getSelectOpts";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

import { editor } from "monaco-editor";
import { Loader2 } from "lucide-react";
import { ApiResponse } from "@/models/Codes";

// Define a schema for our form using Zod
const formSchema = z.object({
	filename: z.string().nonempty("Filename is required"),
	language: z.string().nonempty("Language must be provided"),
	code: z.string().nonempty("Code is required"),
	description: z.string().optional(),
});

type formData = z.infer<typeof formSchema>;
const defaultLan = "plaintext";

export default function CodeForm() {
	const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
	const [editorFocused, setEditorFocused] = useState(false);
	const [lan, setLan] = useState(defaultLan);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<formData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			filename: "example",
			language: defaultLan,
			code: "// Add your code here",
			description: "",
		},
	});

	// Capture the editor instance
	const handleEditorDidMount: OnMount = (editor) => {
		editorRef.current = editor;
		editor.onDidFocusEditorWidget(() => {
			setEditorFocused(true);
		});
		editor.onDidBlurEditorWidget(() => {
			setEditorFocused(false);
		});
	};

	const onSubmit = async (data: formData) => {
		// Update the "code" field with the editor's current value
		// if (editorRef.current) {
		// 	data.code = editorRef.current.getValue();
		// }
		// console.log("Form Data:", data);
		// Further processing (e.g., sending data to an API) goes here
		try {
			setIsSubmitting(true);
			const res = await axios.post<ApiResponse>(`api/addCode`, data);
			toast.success(res.data.message);
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;

			toast.error(axiosError.response?.data.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full max-w-2xl p-4 space-y-6 bg-white rounded-lg shadow"
			>
				{/* Filename Field */}
				<FormField
					control={form.control}
					name="filename"
					render={({ field }) => (
						<FormItem>
							<FormLabel>File Name</FormLabel>
							<FormControl>
								<Input placeholder="example" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Language</FormLabel>
							<Select
								onValueChange={(e) => {
									setLan(e);
									// console.log(e);
									field.onChange(e);
								}}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select the language" />
									</SelectTrigger>
								</FormControl>
								<SelectOptions />
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Code Editor Field */}
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code</FormLabel>
							<FormControl>
								<div
									className={`border rounded-lg  overflow-hidden ${
										editorFocused
											? "border-black"
											: "border-gray-300"
									}`}
								>
									<Editor
										height="60vh"
										defaultLanguage={lan}
										language={lan}
										defaultValue="// Add your code here"
										onMount={handleEditorDidMount}
										onChange={field.onChange}
										options={{
											minimap: { enabled: false },
											scrollBeyondLastLine: false,
										}}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Description Field */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter a description"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "submitting..." : "submit"}
					{isSubmitting && (
						<p>
							<Loader2 />
						</p>
					)}
				</Button>
			</form>
		</Form>
	);
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export interface ApiResponse {
	success: boolean;
	message: string;
}

const formSchema = z.object({
	filename: z
		.string()
		.regex(
			/^[\w,\s-]+\.(c|cpp|java|python)$/i,
			"Filename must be in the format <filename>.(c|cpp|java|python)"
		),
	content: z.string(),
	description: z.string().optional(),
});

export function CForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			filename: "sample.cpp",
			content:
				"public class Example { public static void main(String[] args) {} }",
			description: "",
		},
	}); // ...

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		// console.log(values);
		try {
			await axios.post<ApiResponse>(
				`http://localhost:3000/api/addCode`,
				values
			);
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;

			return <div>{axiosError.response?.data.message}</div>;
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow"
			>
				<FormField
					control={form.control}
					name="filename"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Filename</FormLabel>
							<FormControl>
								<Input placeholder="sample.cpp" {...field} />
							</FormControl>
							<FormDescription>
								{"Enter File Name"}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code</FormLabel>
							<FormControl>
								<Input
									placeholder="public class Example { public static void main(String[] args) {} }"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{"Write your code"}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder="(optional)" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}

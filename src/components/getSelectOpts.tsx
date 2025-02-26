import { SelectContent, SelectItem } from "./ui/select";
const supportedLanguages = [
	"plaintext",
	"cpp",
	"java",
	"python",
	"r",
	"markdown",
	"powershell",
	"xml",
	"php",
	"lua",
	"csharp",
	"ruby",
	"scss",
	"typescript",
	"javascript",
	"css",
	"json",
	"html",
];
export default function SelectOptions() {
	return (
		<SelectContent>
			{supportedLanguages &&
				supportedLanguages.map((val, idx) => (
					<SelectItem key={idx} value={val}>
						{val}
					</SelectItem>
				))}
		</SelectContent>
	);
}

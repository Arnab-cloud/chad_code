import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const CCard: React.FC<{ fileName: string }> = ({ fileName }) => {
	const fileNameWithoutExt = fileName.substring(0, fileName.indexOf("."));
	return (
		<Link href={`/${fileNameWithoutExt}`}>
			<Card>
				<CardHeader>
					<CardTitle>{fileNameWithoutExt}</CardTitle>
				</CardHeader>
			</Card>
		</Link>
	);
};

export default CCard;

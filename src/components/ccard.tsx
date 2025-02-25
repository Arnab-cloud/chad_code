import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const CCard: React.FC<{ fileName: string }> = ({ fileName }) => {
	return (
		<Link href={`/${fileName}`}>
			<Card>
				<CardHeader>
					<CardTitle>{fileName}</CardTitle>
				</CardHeader>
			</Card>
		</Link>
	);
};

export default CCard;

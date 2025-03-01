import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { fileDesc } from "@/models/Codes";
import Link from "next/link";

const CCard: React.FC<{ fileDesc: fileDesc }> = ({ fileDesc }) => {
	return (
		<Link href={`/f/${fileDesc.fId}`}>
			<Card>
				<CardHeader>
					<CardTitle>{fileDesc.filename}</CardTitle>
				</CardHeader>
			</Card>
		</Link>
	);
};

export default CCard;

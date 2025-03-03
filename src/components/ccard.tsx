import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { fileDesc } from "@/models/Codes";
import Link from "next/link";
import CardContext from "./cardContext";
import { memo } from "react";

const CCard: React.FC<{ fileDesc: fileDesc }> = memo(({ fileDesc }) => {
	return (
		<Link href={`/f/${fileDesc.fId}`}>
			<CardContext fid={fileDesc.fId}>
				<Card>
					<CardHeader>
						<CardTitle>{fileDesc.filename}</CardTitle>
					</CardHeader>
				</Card>
			</CardContext>
		</Link>
	);
});

CCard.displayName = "CCard";

export default CCard;

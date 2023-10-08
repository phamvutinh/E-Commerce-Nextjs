"use client";

import { useParams } from "next/navigation";
import React from "react";

import { useOrigin } from "@/hooks/use-origin";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
	entityName: string;
	entityId: string;
}

export const ApiList: React.FC<ApiListProps> = ({ entityName, entityId }) => {
	const params = useParams();
	const origin = useOrigin();

	const baseUrl = `${origin}/api/${params.storeId}`;
	return (
		<>
			<ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />
			<ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityId}}`} />
			<ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}/${entityId}`} />
			<ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/{${entityId}}`} />
			<ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/{${entityId}}`} />
		</>
	);
};

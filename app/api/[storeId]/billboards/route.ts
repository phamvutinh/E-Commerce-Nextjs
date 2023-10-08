import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
	try {
		const { userId } = auth();
		const { label, imageUrls: imageUrl } = await req.json();
		if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
		if (!label) return new NextResponse("Label is required", { status: 400 });
		if (!imageUrl) return new NextResponse("Image url is required", { status: 400 });
		if (!params.storeId) return new NextResponse("Store id is required", { status: 400 });

		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});
		if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });
		const billboard = await prismadb.billboard.create({
			data: {
				label,
				storeId: params.storeId,
				imageUrls: imageUrl,
			},
		});
		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARD_POST]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
	try {
		if (!params.storeId) return new NextResponse("Store id is required", { status: 400 });
		const billboards = await prismadb.billboard.findMany({
			where: {
				storeId: params.storeId,
			},
		});
		return NextResponse.json(billboards);
	} catch (error) {
		console.log("[BILLBOARD_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

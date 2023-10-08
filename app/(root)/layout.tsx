import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

type Props = {
	children: React.ReactNode;
};

const SetupLayout = async ({ children }: Props) => {
	const { userId } = auth();
	if (!userId) {
		redirect("/sign-in");
	}

	const store = await prismadb.store.findFirst({
		where: { userId },
	});

	if (store) {
		redirect(`/${store.id}`);
	}
	return <>{children}</>;
};

export default SetupLayout;

"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "../ui/button";

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen = false, onClose = () => {}, onConfirm = () => {}, loading }) => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;
	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Are you sure?" description="This action can't undo.">
			<div className="pt-6 space-x-2 flex items-center justify-end w-full">
				<Button disabled={loading} variant={"outline"} onClick={onClose}>
					Cancel
				</Button>
				<Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
					Continue
				</Button>
			</div>
		</Modal>
	);
};

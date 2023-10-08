"use client";

import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "./button";

interface ImageUploadProps {
	disabled: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, disabled, onChange, onRemove }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const onUpload = (result: any) => {
		onChange(result?.info?.secure_url);
	};

	if (!mounted) return null;
	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{value.map((url) => (
					<div key={url} className="relative w-[200px] h-[200px] overflow-hidden rounded-md">
						<div className="z-10 absolute top-2 right-2">
							<Button type="button" size={"sm"} variant={"destructive"} onClick={() => onRemove(url)}>
								<Trash className="h-4 w-4" />
							</Button>
						</div>
						<Image src={url} alt="Picture" fill className="object-cover" />
					</div>
				))}
			</div>
			<CldUploadWidget onUpload={onUpload} uploadPreset="vjoluxha">
				{({ open }) => {
					function handleOnClick(e: any) {
						e.preventDefault();
						open();
					}
					return (
						<Button type="button" disabled={disabled} variant={"secondary"} onClick={handleOnClick}>
							<ImagePlus className="h-4 w-4 mr-2" />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;

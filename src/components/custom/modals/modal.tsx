"use client"

import {cn} from "@/lib/utils";
import {FC, useEffect, useState} from "react";
import {ArrowLeftIcon, HeartIcon, UploadIcon} from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    opened?: boolean;
    children?: React.ReactNode;
    title?: string;
    className?: string;
    onClose?: (open: boolean) => void; // Callback để đóng modal
};

const ModalCustom: FC<Props> = ({
    children,
    className,
    opened = false,
    title,
    onClose,
}) => {
    const [showModal, setShowModal] = useState(opened);

    useEffect(() => {
        if (opened) {
            setShowModal(true); // Bắt đầu hiện modal
        } else {
            // Thêm độ trễ để đợi animation hoàn thành trước khi thực sự ẩn modal
            setTimeout(() => setShowModal(false), 300);
        }
    }, [opened]);

    // Thêm/lấy đi lớp 'overflow-hidden' trên body để ngăn cuộn khi modal mở
    useEffect(() => {
        if (opened) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [opened]);

    // Đóng modal khi nhấn phím Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleClose = () => {
        if (onClose) onClose(false); // Gọi callback để báo rằng modal đã đóng
    };

    return showModal ? (
        <div
            onClick={handleClose} // Đóng modal khi click bên ngoài modal
            className={cn(
                `bg-black/50 flex flex-col items-start justify-start w-full h-screen fixed top-0 left-0 z-[900] transition-opacity duration-300 ease-out`,
                {
                    "opacity-100": opened,
                    "opacity-0": !opened,
                }
            )}
            role="dialog"
            aria-modal="true"
        >
            <div
                onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan ra bên ngoài modal
                className={cn(
                    "bg-white p-4 rounded-lg shadow-lg w-full h-full overflow-hidden transform transition-all duration-300 ease-out",
                    {
                        "translate-y-0 opacity-100": opened,
                        "translate-y-4 opacity-0": !opened, // Hiệu ứng dịch xuống khi đóng
                    },
                    className
                )}
            >
                <div className="p-4 xl:px-10 flex items-center justify-between">
                    <Button
                        onClick={handleClose}
                        variant="ghost"
                        size="icon"
                        className="text-neutral-700 focus:outline-none focus:ring-0 w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100"
                    >
                        <ArrowLeftIcon className="w-10 h-w-10" strokeWidth={1.5} />
                    </Button>

                    <div className="flow-root">
                        <div className="flex text-neutral-700 text-sm -mx-3 -my-1.5">
                            <span className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 cursor-pointer">
                                <UploadIcon className="w-5 h-5" strokeWidth={1.5} />
                                <span className="hidden sm:block ml-2.5">Share</span>
                            </span>
                            <span className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 cursor-pointer">
                                <HeartIcon className="w-5 h-5" strokeWidth={1.5} />
                                <span className="hidden sm:block ml-2.5">Save</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-scroll h-[calc(100%-80px)]">{children}</div>
            </div>
        </div>
    ) : null;
};

export default ModalCustom;

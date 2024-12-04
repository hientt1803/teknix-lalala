'use client';

import { ArrowLeftIcon, HeartIcon, UploadIcon } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [opened]);

  // Đóng modal khi nhấn phím Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleClose = () => {
    if (onClose) onClose(false); // Gọi callback để báo rằng modal đã đóng
  };

  return showModal ? (
    <div
      onClick={handleClose} // Đóng modal khi click bên ngoài modal
      className={cn(
        `fixed left-0 top-0 z-[900] flex h-screen w-full flex-col items-start justify-start bg-black/50 transition-opacity duration-300 ease-out`,
        {
          'opacity-100': opened,
          'opacity-0': !opened,
        },
      )}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={e => e.stopPropagation()} // Ngăn sự kiện click lan ra bên ngoài modal
        className={cn(
          'h-full w-full transform overflow-hidden rounded-lg bg-white p-4 shadow-lg transition-all duration-300 ease-out',
          {
            'translate-y-0 opacity-100': opened,
            'translate-y-4 opacity-0': !opened, // Hiệu ứng dịch xuống khi đóng
          },
          className,
        )}
      >
        <div className="flex items-center justify-between p-4 xl:px-10">
          <Button
            onClick={handleClose}
            variant="ghost"
            size="icon"
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-0"
          >
            <ArrowLeftIcon className="h-w-10 w-10" strokeWidth={1.5} />
          </Button>

          <div className="flow-root">
            <div className="-mx-3 -my-1.5 flex text-sm text-neutral-700">
              <span className="flex cursor-pointer rounded-lg px-3 py-1.5 hover:bg-neutral-100">
                <UploadIcon className="h-5 w-5" strokeWidth={1.5} />
                <span className="ml-2.5 hidden sm:block">Share</span>
              </span>
              <span className="flex cursor-pointer rounded-lg px-3 py-1.5 hover:bg-neutral-100">
                <HeartIcon className="h-5 w-5" strokeWidth={1.5} />
                <span className="ml-2.5 hidden sm:block">Save</span>
              </span>
            </div>
          </div>
        </div>
        <div className="h-[calc(100%-80px)] overflow-y-scroll">{children}</div>
      </div>
    </div>
  ) : null;
};

export default ModalCustom;

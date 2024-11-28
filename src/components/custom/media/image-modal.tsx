'use client';

import 'react-photo-view/dist/react-photo-view.css';

import Image from '@/components/common/images/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { replaceSize } from '@/utilities/string';
import { Dispatch, SetStateAction, useState } from 'react';
import ModalCustom from '../modals/modal';
import ImageViewer from './image-viewer';

// export const images = [
//    'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=600',
//    'https://images.pexels.com/photos/333525/pexels-photo-333525.jpeg?auto=compress&cs=tinysrgb&w=600',
//    'https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//    'https://images.pexels.com/photos/1710482/pexels-photo-1710482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//    'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//    'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//    'https://images.pexels.com/photos/257851/pexels-photo-257851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//    'https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//    'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=1600',
//    'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1600',
//    'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=600',
//    'https://images.pexels.com/photos/333525/pexels-photo-333525.jpeg?auto=compress&cs=tinysrgb&w=600',
//    'https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//    'https://images.pexels.com/photos/1710482/pexels-photo-1710482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//    'https://images.pexels.com/photos/917510/pexels-photo-917510.jpeg?auto=compress&cs=tinysrgb&w=1600',
//    'https://images.pexels.com/photos/1194233/pexels-photo-1194233.jpeg?auto=compress&cs=tinysrgb&w=1600',
//    'https://images.pexels.com/photos/236973/pexels-photo-236973.jpeg?auto=compress&cs=tinysrgb&w=1600',
//    'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=600',
//    'https://images.pexels.com/photos/333525/pexels-photo-333525.jpeg?auto=compress&cs=tinysrgb&w=600',
//    'https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//    'https://images.pexels.com/photos/1710482/pexels-photo-1710482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//    'https://images.pexels.com/photos/771079/pexels-photo-771079.jpeg?auto=compress&cs=tinysrgb&w=1600',
//    'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=600',
//    'https://images.pexels.com/photos/333525/pexels-photo-333525.jpeg?auto=compress&cs=tinysrgb&w=600',
//    'https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//    'https://images.pexels.com/photos/1710482/pexels-photo-1710482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//    'https://images.pexels.com/photos/5418318/pexels-photo-5418318.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
//    'https://images.pexels.com/photos/4815278/pexels-photo-4815278.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
//    'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1600',
// ];

type Props = {
   opened: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   images: string[];
};

const ModalShowAllGalley = ({ setOpen, opened, images }: Props) => {
   const [visible, setVisible] = useState(false);
   const [indexImg, setIndexImg] = useState(0);

   const closeImageViewer = () => {
      setVisible(false);
      setOpen(true); // Ensures both ImageViewer and modal close
   };

   return (
      <>
         {/* <Dialog open={opened} onOpenChange={setOpen} modal={false}>
                <DialogContent className="max-w-screen h-screen">
                    <DialogHeader>
                        <div className="p-4 xl:px-10 flex items-center justify-between">
                            <Button
                                onClick={() => setOpen(false)}
                                variant="ghost"
                                size="icon"
                                className="focus:outline-none focus:ring-0 w-10 h-10 rounded-full flex items-center justify-center"
                            >
                                <ArrowLeftIcon
                                    className="w-10 h-w-10"
                                    strokeWidth={1.5}
                                />
                            </Button>
                            <div className="flow-root">
                                <div className="flex text-slate-700 dark:text-slate-50 text-sm -mx-3 -my-1.5">
                                    <Button
                                        variant="ghost"
                                        className="py-1.5 px-3 flex rounded-lg cursor-pointer"
                                    >
                                        <UploadIcon
                                            className="w-5 h-5"
                                            strokeWidth={1.5}
                                        />
                                        <span className="hidden sm:block ml-2.5">
                                            Share
                                        </span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="py-1.5 px-3 flex rounded-lg cursor-pointer"
                                    >
                                        <HeartIcon
                                            className="w-5 h-5"
                                            strokeWidth={1.5}
                                        />
                                        <span className="hidden sm:block ml-2.5">
                                            Save
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                    <ScrollArea className="w-full h-[calc(100vh-200px)]">
                        <div className="w-full max-w-screen-lg mx-auto transform p-4 pt-0 text-left transition-all">
                            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setIndexImg(index);
                                            setVisible(true);
                                        }}
                                        className="group relative mb-5 block w-full cursor-zoom-in after:content after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight focus:outline-none"
                                    >
                                        <img
                                            src={img}
                                            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 focus:outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog> */}
         <ModalCustom opened={opened} onClose={() => setOpen(false)}>
            <ScrollArea className="w-full h-[calc(100vh-200px)]">
               <div className="w-full max-w-screen-lg mx-auto transform p-4 pt-0 text-left transition-all">
                  <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
                     {images.map((img, index) => (
                        <div
                           key={index}
                           onClick={() => {
                              setIndexImg(index);
                              setVisible(true);
                           }}
                           className="group relative mb-5 block w-full cursor-zoom-in after:content after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight focus:outline-none"
                        >
                           <Image
                              src={replaceSize(img)}
                              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 focus:outline-none"
                              loading="lazy"
                              alt=""
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </ScrollArea>
         </ModalCustom>
         <ImageViewer
            images={images.map((image) => replaceSize(image))}
            visible={visible}
            onClose={closeImageViewer}
            indexImg={indexImg}
            onIndexChange={setIndexImg}
         />
      </>
   );
};

export default ModalShowAllGalley;

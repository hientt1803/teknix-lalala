import { Plus, X } from 'lucide-react';

import { AmountAction } from '@/components/custom/input/amount-action';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const MOCK_AGE_DATA = [
  { label: '1 year', value: '1' },
  { label: '2 years', value: '2' },
  { label: '3 years', value: '3' },
  { label: '4 years', value: '4' },
  { label: '5 years', value: '5' },
  { label: '6 years', value: '6' },
  { label: '7 years', value: '7' },
  { label: '8 years', value: '8' },
  { label: '9 years', value: '9' },
  { label: '10 years', value: '10' },
  { label: '11 years', value: '11' },
  { label: '12 years', value: '12' },
  { label: '13 years', value: '13' },
  { label: '14 years', value: '14' },
  { label: '15 years', value: '15' },
  { label: '16 years', value: '16' },
  { label: '17 years', value: '17' },
];

type IDrawerContent = {
  listRoom: { adults: number; children: number[] }[];
  handleDeleteChildren: (roomIndex: number, value: number) => void;
  handleOnChangeChildren: (roomIndex: number, value: string | null) => void;
  handleOnChangeAdults: (value: number, roomIndex: number) => void;
  close: () => void;
  open: () => void;
  addNewRoom: () => void;
  deleteRoom: (roomIndex: number) => void;
};

export const GroupInputSelectDrawerContent = ({
  listRoom,
  handleDeleteChildren,
  handleOnChangeChildren,
  handleOnChangeAdults,
  close,
  open,
  addNewRoom,
  deleteRoom,
}: IDrawerContent) => {
  return (
    <div className="p-1">
      <div className="space-y-4">
        {listRoom.map((room, roomIndex) => (
          <div key={roomIndex}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Room {roomIndex + 1}</h3>
              {listRoom.length > 1 && (
                <button
                  className="text-sm font-semibold text-red-600 hover:underline"
                  onClick={() => deleteRoom(roomIndex)}
                >
                  Remove
                </button>
              )}
            </div>

            {/* Adults and Children Inputs */}
            <div className="flex flex-col md:flex-row md:items-start md:gap-6">
              {/* Adults */}
              <div className="w-full space-y-2 md:w-auto">
                <Label htmlFor={`adults-${roomIndex}`}>Adults</Label>
                {/* <Input
                           id={`adults-${roomIndex}`}
                           type="number"
                           className="w-full"
                           value={room.adults}
                           onChange={(e) => handleOnChangeAdults(Number(e.target.value), roomIndex)}
                        /> */}
                <AmountAction
                  value={room.adults}
                  onChange={value => {
                    handleOnChangeAdults(Number(value), roomIndex);
                  }}
                  min={0}
                  decrClassName="text-sm"
                  incrClassName="text-sm"
                  inputClassName="text-lg font-[550]"
                  wrapperClassName="bg-transparent"
                />
              </div>

              {/* Children */}
              <div className="w-full space-y-2">
                <Label>Children (age)</Label>
                <div className="flex flex-wrap items-center gap-2">
                  {room.children.map((childAge, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center space-x-2 rounded-md border border-gray-300 px-2 py-2 text-sm"
                    >
                      <span>
                        {childAge} {childAge === 1 ? 'year' : 'years'}
                      </span>
                      <button
                        onClick={() =>
                          handleDeleteChildren(roomIndex, childAge)
                        }
                      >
                        <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                      </button>
                    </div>
                  ))}

                  {room.children.length < 4 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-gray-300 py-5 text-gray-500"
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-fit p-1 px-2">
                        <ScrollArea className="h-64 w-fit">
                          <ul className="w-fit space-y-1">
                            {MOCK_AGE_DATA.map(item => (
                              <li key={item.value}>
                                <button
                                  className="w-full px-2 py-1 text-left text-sm hover:bg-gray-100"
                                  onClick={() =>
                                    handleOnChangeChildren(
                                      roomIndex,
                                      item.value,
                                    )
                                  }
                                >
                                  {item.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </div>
            </div>

            {roomIndex !== listRoom.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={addNewRoom}
          className="w-full md:w-auto"
        >
          Add a room
        </Button>
        <Button variant="default" onClick={close} className="w-full">
          Done
        </Button>
      </div>
    </div>
  );
};

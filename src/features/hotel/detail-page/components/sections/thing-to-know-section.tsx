import { PolicyStruct } from '@/stores/features/stay/type';
import { formatTime } from '@/utilities/datetime';

type Props = {
  policies?: PolicyStruct[];
  front_desk_time_start?: string;
  front_desk_time_end?: string;
  check_in_time?: string;
  check_out_time?: string;
};

const ThingToKnowSection = ({
  policies,
  front_desk_time_end,
  front_desk_time_start,
  check_in_time,
  check_out_time,
}: Props) => {
  return (
    <div className="my-10 space-y-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
      <h2 className="text-2xl font-semibold">Things to know</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

      <div>
        <h4 className="text-lg font-semibold">Check-in time</h4>
        <div className="mt-3 max-w-md text-sm text-neutral-500 dark:text-neutral-300 sm:text-base">
          <div className="flex justify-between space-x-10 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-700 dark:text-white">
            <span>Check-in</span>
            <span>After - {formatTime(check_in_time || '02:00:00')}</span>
          </div>
          <div className="flex justify-between space-x-10 p-3">
            <span>Check-out</span>
            <span>Until - {formatTime(check_out_time || '12:00:00')}</span>
          </div>
        </div>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      {policies?.map((policy, index) => (
        <div key={index}>
          <h4 className="text-base font-medium">{policy.title}</h4>
          {policy.title.includes('Extra info') ? (
            <span
              className="mt-3 block text-neutral-500 dark:text-neutral-400"
              dangerouslySetInnerHTML={{ __html: policy.paragraphs }}
            />
          ) : (
            <span className="mt-3 block text-neutral-500 dark:text-neutral-400">
              {policy.paragraphs}
            </span>
          )}
        </div>
      ))}

      {/* <div className="w-14 border-b border-neutral-200" />
            <div>
                <h4 className="text-lg font-semibold">Special Note</h4>
                <div className="prose sm:prose">
                    <ul className="mt-3 text-neutral-500 space-y-2">
                        <li>
                            Ban and I will work together to keep the landscape and
                            environment green and clean by not littering, not using
                            stimulants and respecting people around.
                        </li>
                        <li>Do not sing karaoke past 11:30</li>
                    </ul>
                </div>
            </div> */}
    </div>
  );
};

export default ThingToKnowSection;

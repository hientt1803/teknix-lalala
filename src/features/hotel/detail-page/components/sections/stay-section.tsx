import {DescriptionStruct} from "@/stores/features/stay/type";

type Props = {
    desc?: DescriptionStruct[];
};
const StaySection = ({desc}: Props) => {
    return (
        <div className="border border-slate-200 dark:border-slate-700 p-6 rounded-lg space-y-8">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <div className="text-slate-600 dark:text-slate-300">
                {desc?.map((de) => (
                    <div key={de.title}>
                        <div className="flex">
                            <h3 className="text-black font-semibold">{de.title}</h3>
                        </div>
                        <p className="text-sm font-normal text-neutral-800">
                            {de.paragraphs.map((pa, index) => (
                                <span key={index}>
                                    <span>{pa}</span>
                                    <br />
                                    <br />
                                </span>
                            ))}
                        </p>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaySection;

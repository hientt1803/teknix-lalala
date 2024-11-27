import {DescriptionStruct} from "@/stores/features/stay/type";

type Props = {
    desc?: DescriptionStruct[];
};
const StaySection = ({desc}: Props) => {
    return (
        <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-2xl space-y-8">
            <h2 className="text-2xl font-semibold">Stay information</h2>
            <div className="w-14 border-b border-slate-200 dark:border-slate-100" />
            <div className="text-slate-600 dark:text-slate-300">
                {desc?.map((de) => (
                    <div key={de.title}>
                        <div className="flex">
                            <h3 className="font-semibold">{de.title}</h3>
                        </div>
                        <p>
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

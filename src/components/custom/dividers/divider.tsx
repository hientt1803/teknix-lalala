import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import {SeparatorProps} from "@radix-ui/react-separator";

interface DividerProps extends SeparatorProps {
    label?: React.ReactNode;
    containerClassName?: string;
}

const DividerLabel = ({
    label,
    containerClassName = "", // Default empty string
    orientation = "horizontal", // Default orientation
    ...props
}: DividerProps) => {
    const renderSeparator = () => <Separator orientation={orientation} {...props} />;

    return (
        <div
            className={cn(
                "flex justify-center overflow-hidden items-center gap-4",
                orientation === "vertical" ? "flex-col" : "flex-row", // Handle orientation with flex direction
                containerClassName
            )}
        >
            {label ? (
                <>
                    {renderSeparator()}
                    {label}
                    {renderSeparator()}
                </>
            ) : (
                renderSeparator()
            )}
        </div>
    );
};

export default DividerLabel;

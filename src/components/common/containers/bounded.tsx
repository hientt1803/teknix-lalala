import {cn} from "@/lib/utils";

type BoundedProps = {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
};

const Bounded = ({
    as: Component = "section",
    className,
    children,
    ...restProps
}: BoundedProps) => {
    return (
        <Component {...restProps} className={cn("container mx-auto", className)}>
            {children}
        </Component>
    );
};

export default Bounded;

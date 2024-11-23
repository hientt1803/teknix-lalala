import {cn} from "@/lib/utils";

type HeadingProps = {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    size?: "xl" | "lg" | "md" | "sm";
    children: React.ReactNode;
    className?: string;
};

const Heading = ({
    as: Component = "h2",
    className,
    children,
    size = "md",
    ...restProps
}: HeadingProps) => {
    return (
        <Component
            {...restProps}
            className={cn(
                "font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100",
                size === "xl" && "text-5xl md:text-7xl",
                size === "lg" && "text-4xl md:text-5xl",
                size === "md" && "text-3xl md:text-4xl ",
                size === "sm" && "text-2xl md:text-3xl",
                className
            )}
        >
            {children}
        </Component>
    );
};

export default Heading;

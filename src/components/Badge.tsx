import { cn } from "@sglara/cn";

const Badge = ({
  variant,
  text,
}: {
  variant: "primary" | "secondary";
  text: string;
}) => {
  return (
    <span
      className={cn(
        "text-center p-1 px-2 rounded uppercase whitespace-nowrap",
        variant === "primary" && "bg-[#fdf2f4] text-[#ec798f]",
        variant === "secondary" && "bg-[#f2faf8] text-[#8ebda5]"
      )}
    >
      {text}
    </span>
  );
};

export default Badge;

import type { CourseMaterialItemProps } from "./courseMaterials.types";

export const CourseMaterialItem = ({
  icon,
  title,
  description,
}: CourseMaterialItemProps) => {
  return (
    <div className="flex justify-between items-center gap-1 border-b-1 border-gray/50 md:last:border-0 py-3">
      <div className="flex items-center gap-2 font-light">
        {icon}
        <p className="text-lg lg:text-xl whitespace-nowrap">{title}:</p>
      </div>
      <p className="text-lg lg:text-xl">{description}</p>
    </div>
  );
};

export default CourseMaterialItem;
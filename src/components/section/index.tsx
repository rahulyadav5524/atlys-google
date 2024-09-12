import { cn } from "@/lib/utils";

interface ISectionProps {
  actionItems: string[];
}

const Section = (props: ISectionProps) => {
  return (
    <div className="border-b border-[#292929] px-4 text-sm">
      {props.actionItems.map((item, index) => (
        <button
          key={index}
          className={cn("py-2 px-3 text-[#9aa0a6]", {
            "border-b-2 text-[#e8e8e8] font-medium": index === 1
          })}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Section;

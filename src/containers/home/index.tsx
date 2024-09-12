import Carousal from "@/components/carousal";
import Header from "@/components/header";
import ImageSearch from "@/components/image-search";
import Section from "@/components/section";

const actionItems: string[] = ["All", "Images", "Shopping", "News", "Videos"];

export function Home() {
  return (
    <div className="min-h-screen bg-[#1f1f1f]">
      <Header />
      <Section actionItems={actionItems} />
      <Carousal />
      <ImageSearch />
    </div>
  );
}

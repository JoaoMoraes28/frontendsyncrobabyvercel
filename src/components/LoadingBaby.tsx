import { useLottie } from "lottie-react";
import babyCrawlingAnimation from "../assets/baby_crawling.json";

interface Props {
  text: string
}

export function LoadingBaby({ text }: Props) {
  const options = {
    animationData: babyCrawlingAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="w-full flex flex-col items-center justify-center col-span-full py-12 gap-4">
      <div className="w-48 md:w-64">{View}</div>
      <p className="text-primary font-nunito font-semibold text-lg animate-pulse text-center">
        {text}...
      </p>
    </div>
  );
}

import Ripple from "@/components/Custom/Ripple";
import { cn } from "@/lib/utils";
import { SearchCodeInputDialog } from "@/section/SearchCodeInput";
import { ModeToggle } from "@/section/SwitchTheme";

export default function HomePage() {
  return (
    <>
      <header className="flex items-center justify-center gap-3 py-12">
        <div className="flex items-center justify-center gap-3">
          <img
            src="/tapshare.png"
            alt="TapShare"
            draggable="false"
            className="drag-none pointer-events-none size-12 cursor-pointer select-none rounded-full"
          />
          <h1 className="cursor-pointer select-none font-merriweather text-3xl font-black leading-none tracking-wide">
            TapShare
          </h1>
        </div>
        <ModeToggle />
      </header>
      <SearchCodeInputDialog />
      <FileUpload />
    </>
  );
}

function FileUpload() {
  let numCircles = 8;
  let mainCircleSize = 210;
  let circleGap = 70;
  const windowWidth = window.innerWidth;
  if (windowWidth < 640) {
    numCircles = Math.floor(windowWidth / 100 + 12);
    mainCircleSize = Math.floor(windowWidth / 100 + 120);
    circleGap = Math.floor((windowWidth / 100) * 18);
  }

  return (
    <div
      className={cn(
        "relative flex min-h-[67dvh] w-full flex-col items-center justify-center overflow-hidden sm:mt-4"
      )}
    >
      <img
        src="/tapshare.png"
        alt="TapShare"
        draggable="false"
        className="drag-none z-10 size-16 cursor-pointer select-none rounded-full opacity-10 dark:opacity-20 sm:size-28"
      />
      <Ripple
        numCircles={numCircles}
        mainCircleSize={mainCircleSize}
        circleGap={circleGap}
        animate={false}
      />
    </div>
  );
}

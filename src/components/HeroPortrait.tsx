import Image from "next/image";
import { site } from "../../content/site";

export function HeroPortrait() {
  return (
    <div className="relative mr-auto aspect-[4/5] w-[min(72vw,16rem)] max-h-[44svh] sm:mr-auto sm:max-h-none sm:w-full sm:max-w-xs lg:ml-auto lg:mr-0 lg:max-w-none">
      <div className="portrait-backdrop" aria-hidden>
        <span className="portrait-glow portrait-glow-a" />
        <span className="portrait-glow portrait-glow-b" />
        <span className="portrait-ring" />
      </div>

      <div className="relative z-10 h-full overflow-hidden rounded-[1.5rem] bg-[#1a1a1a] sm:rounded-[2rem]">
        <Image
          src="/images/paul-gibson.png"
          alt={`${site.name}, creative marketing leader`}
          fill
          className="hero-image object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 40vw"
          priority
        />
      </div>
    </div>
  );
}

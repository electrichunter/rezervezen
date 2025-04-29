import { Hero } from "./component/ul/home/shape-landing-hero";
import Menu from "./component/ul/nav-header";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-5 min-w-screen bg-gradient-to-b  ">
      <Menu />
        <Hero />
      </div>
    </>
  );
}

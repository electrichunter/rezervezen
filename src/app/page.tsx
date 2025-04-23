import HeroGeometric from "../app/component/ul/shape-landing-hero"; // component yazılmalı
import Menu from "./component/ul/nav-header"; // component yazılmalı

export default function Page() {
  return (
    <>
      <div className=" ">
    {/*     <Menu /> */}
        <HeroGeometric
          badge="Yeni Nesil Randevu Sistemi"
          title1="Güvenli ve Hızlı"
          title2="Randevu Sistemi"
        />
      </div>
    </>
  );
}

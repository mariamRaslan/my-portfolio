import { cn } from "@/lib/utils";
import meshImg from "../../../public/images/mesh.png";

function BackgroundMesh({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 bg-cover bg-center  bg-no-repeat",
        className
      )}
      style={{ backgroundImage: `url(${meshImg.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-0 to-transparent" />
    </div>
  );
}

export default BackgroundMesh;
// import Image from "next/image";
// import meshImg from "../../../public/images/mesh.png";

// function BackgroundMesh() {
//   return (
//     <div className="absolute inset-0 -z-10 ">
//       <Image
//         src={meshImg}
//         className="w-full object-cover"
//         fill
//         alt="background mesh"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-neutral-0 to-transparent " />
//     </div>
//   );
// }

// export default BackgroundMesh;

import BackgroundMesh from "@/components/ui/BackgroundMesh";
import { Link } from "@/i18n/navigation";

export const metadata = {
  title: "Not Found",
};

function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <BackgroundMesh />
      <div className="container">
        <div className="flex flex-col items-center justify-center py-10 text-center md:py-20">
          <div className="relative mb-8">
            <h1 className="text-gradient-brand text-[120px] leading-none font-bold select-none md:text-[180px] lg:text-[240px]">
              404
            </h1>
            <div className="bg-gradient-brand absolute inset-0 opacity-20 blur-3xl"></div>
          </div>

          {/* Error Message */}
          <div className="mx-auto mb-12 max-w-2xl space-y-4">
            <h2 className="text-foreground text-3xl font-bold md:text-4xl">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg">
              Oops! The page you're looking for seems to have wandered off into
              the digital wilderness.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="bg-gradient-brand rounded-lg px-8 py-3 font-medium whitespace-nowrap text-white transition-opacity hover:opacity-90"
            >
              Back to Home
            </Link>
            {/* <button className="border-border text-foreground hover:bg-accent rounded-lg border-2 px-8 py-3 font-medium transition-colors">
              Go Back
            </button> */}
          </div>

          {/* Decorative Elements */}
          <div className="mx-auto mt-16 grid max-w-md grid-cols-3 gap-8 opacity-40">
            <div className="bg-success-200 h-2 animate-pulse rounded-full"></div>
            <div className="h-2 animate-pulse rounded-full bg-teal-300 delay-150"></div>
            <div className="bg-success-400 h-2 animate-pulse rounded-full delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

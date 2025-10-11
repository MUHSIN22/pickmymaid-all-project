export default function MaidCardSkeleton() {
  return (
    <div
      className="
        flex flex-col items-center bg-white
        p-2 sm:p-4
        border border-[#D6E4FF] rounded-[35px_0_35px_0]
        cursor-pointer select-none h-full
        hover:shadow-[0px_0px_15px_rgba(0,0,0,0.2)]
        hover:[&>div>img]:scale-110
        transition-shadow duration-300 ease-in-out
      "
    >
      {/* Aspect ratio 1:1 */}
      <div className="relative w-[90%] md:w-full pb-[100%] overflow-hidden rounded-[0_35px_0_35px]">
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      </div>

      {/* Skeleton text lines */}
      <div className="w-full space-y-2 mt-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-[3px] bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-[3px] bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

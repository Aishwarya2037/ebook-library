const Banner = () => {
  return (
    <div className="max-w-6xl mx-auto mt-6 px-4">
      <div
        className="relative rounded-xl overflow-hidden h-[180px] md:h-[220px] flex items-center justify-between pl-4 md:pl-12 bg-cover bg-center"
        style={{
          backgroundImage: "url('/newBanner.jpg')", // your image here
        }}
      >
        {/* LEFT TEXT */}
        <div className="text-white max-w-md">
          <h1 className="text-2xl md:text-3xl font-semibold leading-snug">
            Connect, Share and Trade Your Favourite Reads...
          </h1>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:block">
          <img
            src={"/images/homeBook-img.png"} // 👉 your image here
            alt="book"
            className="h-[220px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;

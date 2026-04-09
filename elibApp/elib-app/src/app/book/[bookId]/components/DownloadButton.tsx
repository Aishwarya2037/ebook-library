"use client";

const DownloadButton = ({ fileLink }: { fileLink: string }) => {
  const handleDownload = () => {
    const fullLink = `http://localhost:3100/uploads/${fileLink}`;
    window.open(fullLink, "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-block w-50 px-6 py-3 bg-[#DA3D20] text-white font-semibold rounded-lg hover:bg-[#ca3217] transition"
    >
      Download the book
    </button>
  );
};

export default DownloadButton;

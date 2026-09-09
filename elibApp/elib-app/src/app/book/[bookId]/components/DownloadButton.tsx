// "use client";

// const DownloadButton = ({ fileLink }: { fileLink: string }) => {
//   const handleDownload = () => {
//     // const fullLink = `https://ebook-library-wbmv.onrender.com/uploads/${fileLink}`;
//     window.open(fileLink, "_blank");
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       className="inline-block w-50 px-6 py-3 bg-[#DA3D20] text-white font-semibold rounded-lg hover:bg-[#ca3217] transition"
//     >
//       Download the book
//     </button>
//   );
// };

// export default DownloadButton;

// "use client";

// const DownloadButton = ({ fileLink }: { fileLink: string }) => {
//   const handleDownload = () => {
//     console.log("PDF FILE LINK:", fileLink);

//     window.open(fileLink, "_blank");
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       className="inline-block w-50 px-6 py-3 bg-[#DA3D20] text-white font-semibold rounded-lg hover:bg-[#ca3217] transition"
//     >
//       Download the book
//     </button>
//   );
// };

// export default DownloadButton;

// "use client";

// const DownloadButton = ({ fileLink }: { fileLink: string }) => {
//   const handleDownload = async () => {
//     try {
//       console.log("PDF FILE LINK:", fileLink);

//       const response = await fetch(fileLink);

//       if (!response.ok) {
//         throw new Error("Failed to fetch PDF");
//       }

//       const blob = await response.blob();

//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "book.pdf";

//       document.body.appendChild(link);
//       link.click();

//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("DOWNLOAD ERROR:", error);
//       alert("Failed to download PDF");
//     }
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       className="inline-block w-50 px-6 py-3 bg-[#DA3D20] text-white font-semibold rounded-lg hover:bg-[#ca3217] transition"
//     >
//       Download the book
//     </button>
//   );
// };

// export default DownloadButton;

// "use client";

// const DownloadButton = ({ fileLink }: { fileLink: string }) => {
//   const handleReadBook = () => {
//   const readUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/read/${book._id}`;

//   console.log("PDF URL:", readUrl);

//   window.open(readUrl, "_blank", "noopener,noreferrer");
// };

//   return (
//    <button
//   onClick={handleReadBook}
//   className="inline-block cursor-pointer px-5 py-2.5 rounded-lg bg-[#DA3D20] text-white font-semibold hover:bg-[#ca3217] transition"
// >
//   Read Book
// </button>
//   );
// };

// export default DownloadButton;

"use client";

const DownloadButton = ({ bookId }: { bookId: string }) => {
  const handleReadBook = () => {
    const readUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/read/${bookId}`;

    console.log("PDF URL:", readUrl);

    window.open(readUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleReadBook}
      className="inline-block cursor-pointer px-5 py-2.5 rounded-lg bg-[#DA3D20] text-white font-semibold hover:bg-[#ca3217] transition"
    >
      Read Book
    </button>
  );
};

export default DownloadButton;

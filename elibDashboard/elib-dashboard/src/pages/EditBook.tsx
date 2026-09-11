// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import useUpdateBook from "../hooks/useUpdateBook";
// import useBookById from "../hooks/useBookById";

// const EditBook = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading, error } = useBookById(id!);
//   const { mutate: updateBookMutation, isPending } = useUpdateBook();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [author, setAuthor] = useState("");
//   const [coverImage, setCoverImage] = useState<File | null>(null);
//   const [pdfFile, setPdfFile] = useState<File | null>(null);

//   useEffect(() => {
//     if (data?.book) {
//       setTitle(data.book.title);
//       setAuthor(data.book.author);
//       setDescription(data.book.description);
//     }
//   }, [data]);

//   //   const handleSubmit = (e: React.FormEvent) => {
//   //     e.preventDefault();

//   //     const formData = new FormData();

//   //     formData.append("title", title);
//   //     formData.append("description", description);

//   //     if (coverImage) {
//   //       formData.append("coverImage", coverImage);
//   //     }

//   //     if (bookFile) {
//   //       formData.append("file", bookFile);
//   //     }

//   //     mutation.mutate({
//   //       id: id as string,
//   //       formData,
//   //     });
//   //   };
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append("title", title);
//     formData.append("author", author);
//     formData.append("description", description);

//     if (coverImage) {
//       formData.append("coverImage", coverImage);
//     }

//     if (pdfFile) {
//       formData.append("pdfFile", pdfFile);
//     }

//     updateBookMutation(
//       { id: id!, formData },
//       {
//         onSuccess: () => {
//           navigate("/books");
//         },
//       },
//     );
//   };

//   if (isLoading) return <p>Loading book...</p>;
//   if (error) return <p>Failed to load book</p>;

//   return (
//     <div className="max-w-2xl">
//       <h1 className="text-2xl font-semibold mb-6">Edit Book</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           value={title}
//           placeholder="Enter title"
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border p-3 rounded"
//         />

//         <input
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           className="w-full border p-3 rounded"
//         />

//         <textarea
//           value={description}
//           placeholder="Enter description"
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full border p-3 rounded"
//           rows={5}
//         />

//         <div>
//           <label className="block mb-1 font-medium">Cover Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Upload PDF File</label>
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isPending}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {isPending ? "Updating..." : "Update Book"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditBook;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUpdateBook from "../hooks/useUpdateBook";
import useBookById from "../hooks/useBookById";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useBookById(id!);
  const { mutate: updateBookMutation, isPending } = useUpdateBook();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // Load existing book data
  useEffect(() => {
    if (data?.book) {
      setTitle(data.book.title);
      setAuthor(data.book.author);
      setDescription(data.book.description);
    }
  }, [data]);

  // Update book
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    if (pdfFile) {
      formData.append("pdfFile", pdfFile);
    }

    updateBookMutation(
      {
        id: id!,
        formData,
      },
      {
        onSuccess: () => {
          navigate("/books");
        },
      },
    );
  };

  if (isLoading) {
    return <p>Loading book...</p>;
  }

  if (error) {
    return <p>Failed to load book</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Edit Book</h1>

        <p className="text-sm text-gray-500 mt-1">
          Update the details of your book
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title*
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author*
            </label>

            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter book author"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Enter book description"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
            />

            <p className="text-xs text-gray-500 mt-1">
              Leave empty if you don't want to change the cover image.
            </p>
          </div>

          {/* PDF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PDF File
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
            />

            <p className="text-xs text-gray-500 mt-1">
              Leave empty if you don't want to change the PDF.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/books")}
              className="cursor-pointer px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;

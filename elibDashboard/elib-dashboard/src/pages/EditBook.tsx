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

  useEffect(() => {
    if (data?.book) {
      setTitle(data.book.title);
      setAuthor(data.book.author);
      setDescription(data.book.description);
    }
  }, [data]);

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();

  //     const formData = new FormData();

  //     formData.append("title", title);
  //     formData.append("description", description);

  //     if (coverImage) {
  //       formData.append("coverImage", coverImage);
  //     }

  //     if (bookFile) {
  //       formData.append("file", bookFile);
  //     }

  //     mutation.mutate({
  //       id: id as string,
  //       formData,
  //     });
  //   };
  const handleSubmit = (e: React.FormEvent) => {
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
      { id: id!, formData },
      {
        onSuccess: () => {
          navigate("/books");
        },
      },
    );
  };

  if (isLoading) return <p>Loading book...</p>;
  if (error) return <p>Failed to load book</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <textarea
          value={description}
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded"
          rows={5}
        />

        <div>
          <label className="block mb-1 font-medium">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload PDF File</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isPending ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;

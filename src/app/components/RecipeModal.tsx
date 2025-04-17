import React, { useState } from 'react';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newRecipe: any) => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [imageFile, setImageFile] = useState<File | null>(null); // State to hold the selected image file

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]); // Set the selected file
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newRecipe = {
      title: formData.get("title"),
      ingredients: formData.get("ingredients").split(","),
      instructions: formData.get("instructions"),
      createdBy: "your_user_id", // Replace with actual user ID
    };

    // Append the image file to the FormData
    if (imageFile) {
      formData.append("image", imageFile);
    }

    onSubmit(newRecipe); // Call the onSubmit function with the new recipe data
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Recipe</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Recipe Title" required className="mb-2 w-full p-2 border" />
          <input name="ingredients" placeholder="Ingredients (comma separated)" required className="mb-2 w-full p-2 border" />
          <textarea name="instructions" placeholder="Instructions" required className="mb-2 w-full p-2 border" />
          <input type="file" accept="image/*" onChange={handleFileChange} required className="mb-2 w-full p-2 border" />
          <button type="submit" className="bg-amber-600 text-white p-2 rounded">Add Recipe</button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">Close</button>
      </div>
    </div>
  );
};

export default RecipeModal;

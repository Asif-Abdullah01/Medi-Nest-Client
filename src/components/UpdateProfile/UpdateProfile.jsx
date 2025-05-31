import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { updatePassword } from "firebase/auth";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(name, photo);
      if (password) {
        await updatePassword(user, password);
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-lg p-8">
      <h2 className="text-2xl mt-16 font-semibold mb-6 text-center text-gray-800">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col items-center">
          <img
            src={photo || "/default-avatar.png"}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full border mb-2"
          />
          <input
            type="url"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="input input-bordered w-full mt-2"
          />
        </div>

        <div>
          <label className="label font-medium">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="label font-medium">Email</label>
          <input
            type="email"
            className="input input-bordered w-full bg-gray-100"
            value={user?.email}
            readOnly
          />
        </div>

        <div>
          <label className="label font-medium">New Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;

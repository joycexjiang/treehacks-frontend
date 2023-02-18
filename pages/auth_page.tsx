import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState } from "react";
import { useMutation } from "../convex/_generated/react";

export default function AuthPage() {
  const { user } = useAuth0();
  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const generateUploadUrl = useMutation("sendMessage:generateUploadUrl");
  const sendImage = useMutation("sendMessage:sendImage");

  async function handleSendImage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // setSelectedImage(null);
    if (!imageInput.current) return;
    if (!selectedImage) return;
    console.log("selectedImage", selectedImage);

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    console.log(postUrl);
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage.type },
      body: selectedImage,
    });
    const { storageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the messages table
    await sendImage(storageId, user!.name);
  }

  return (
    <div>
      <h1>Auth Page</h1>
      <form onSubmit={handleSendImage}>
        <input
          type="file"
          accept="audio/*"
          ref={imageInput}
          onChange={(event) =>
            setSelectedImage(event.target.files && event.target.files[0])
          }
          className="ms-2 btn btn-primary"
          disabled={!!selectedImage}
        />
        <input type="submit" value="Send Image" disabled={!selectedImage} />
      </form>
    </div>
  );
}

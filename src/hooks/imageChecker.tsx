import { useState } from "react";
const ImageChecker: React.FC<{ imageUrl: string; title: string, size: string}> = ({
    imageUrl,
    title,
    size
  }) => {
    const [error, setError] = useState(false);
  
    const onError = () => {
      setError(true);
    };
  
    return (
      <>
        {error ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm40-337 160-160 160 160 160-160 40 40v-183H200v263l40 40Zm-40 257h560v-264l-40-40-160 160-160-160-160 160-40-40v184Zm0 0v-264 80-376 560Z" />
          </svg>
        ) : (
          <img
            className={`${size} rounded object-cover`}
            src={imageUrl.replace("large", "medium")}
            alt={title}
            onError={onError}
            loading="lazy"
          />
        )}
      </>
    );
  };
  
export default ImageChecker;
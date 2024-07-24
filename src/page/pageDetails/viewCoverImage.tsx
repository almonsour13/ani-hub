import React, { useEffect } from "react";
import ImageChecker from "../../hooks/imageChecker";
interface CoverImage {
    imageUrl: string;
}

const ViewCoverImage: React.FC<CoverImage> = ({ imageUrl }) => {
    const closeModal = () => {
        const modal = document.getElementById("view-cover-image") as HTMLDialogElement | null;
        if (modal) {
            modal.classList.remove("modal-open");
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            closeModal();
        }
    };
    
    const handleClickOutside = (event: React.MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="modal backdrop-blur-sm" id="view-cover-image">
            <div className="relative w-full h-full p-5 flex items-center justify-center" onClick={closeModal}>
                <button className="absolute z-20 top-0 right-0 m-4" onClick={closeModal}>
                    <svg
                        className="fill-current h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                    >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                </button>
                <div className="flex bg-primary h-96 w-72 rounded" onClick={(e) => e.stopPropagation()}>
                    {imageUrl ? (
                        <ImageChecker
                            imageUrl={imageUrl}
                            title={""}
                            size="imageUrl"
                          />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewCoverImage;

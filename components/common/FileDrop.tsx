import React, { useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface FileDropProps {
  onUpdate: (arg: FileWithPath) => void;
}

const FileDrop: React.FC<FileDropProps> = ({ onUpdate }) => {
  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    onUpdate(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    rootRef, // Ref to the `<div>`
    inputRef, // Ref to the `<input>`
  } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`bg-purple-50 px-10 border rounded-lg h-40 cursor-pointer flex items-center font-bold text-purple-300 ${
        isDragActive || acceptedFiles.length > 0 ? "bg-purple-600" : null
      }`}
    >
      <input {...getInputProps()} />
      <p>Drag drop some files here, or click to select files</p>
    </div>
  );
};

export default FileDrop;

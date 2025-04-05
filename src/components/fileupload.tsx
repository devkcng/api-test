import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = async () => {
        if (!selectedFiles) {
            setUploadStatus('Please select files to upload.');
            return;
        }

        const formData = new FormData();
        Array.from(selectedFiles).forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post(
                'https://above-ruling-ringtail.ngrok-free.app/upload-video',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setUploadStatus(`Success: ${response.data.message}`);
        } catch (error) {
            setUploadStatus('Error uploading files. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload Videos</h2>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default FileUpload;
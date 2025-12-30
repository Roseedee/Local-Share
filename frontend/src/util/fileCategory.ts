import iconPicture from '@/assets/file-category/picture.png'
import iconVideo from '@/assets/file-category/video.png'
import iconAudio from '@/assets/file-category/sound.png'
import iconDocument from '@/assets/file-category/document.png'
import iconOther from '@/assets/file-category/other.png'

export default class FileCategory {
    private Image = "image";
    private Video = "video"
    private Audio = "audio"
    private Document = "document"
    private Othor = "other"

    readonly category: string;

    constructor(fileType?: string) {
        if (!fileType) {
            this.category = this.Othor;
            return;
        }

        if (fileType.startsWith("image/")) {
            this.category = this.Image;
            return;
        }
        if (fileType.startsWith("video/")) {
            this.category = this.Video;
            return;
        }
        if (fileType.startsWith("audio/")) {
            this.category = this.Audio;
            return;
        }

        const documentTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "text/plain",
            "text/html",
            "application/json",
            "text/csv"
        ];

        this.category = documentTypes.includes(fileType)
            ? this.Document
            : this.Othor;
    }

    isImage() { return this.category === this.Image; }
    isVideo() { return this.category === this.Video; }
    isAudio() { return this.category === this.Audio; }
    isDocument() { return this.category === this.Document; }
    isOther() { return this.category === this.Othor; }

    getIcon(): string {
        switch (this.category) {
            case this.Image: return iconPicture;
            case this.Video: return iconVideo;
            case this.Audio: return iconAudio;
            case this.Document: return iconDocument;
            default: return iconOther;
        }
    }

    getCategoryName(): string {
        switch (this.category) {
            case this.Image: return "Picture";
            case this.Video: return "Video";
            case this.Audio: return "Audio";
            case this.Document: return "Document";
            default: return "Other";
        }
    }
}

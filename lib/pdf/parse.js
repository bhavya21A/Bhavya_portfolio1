import pdf from "pdf-parse";
export async function parseResumePdf(buffer) {
    const parsed = await pdf(buffer);
    const text = parsed.text
        .replace(/\u0000/g, "")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    if (text.length < 120) {
        throw new Error("The PDF did not contain enough readable text. Try exporting a text-based PDF.");
    }
    return text;
}

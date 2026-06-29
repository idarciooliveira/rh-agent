import { extractText, getDocumentProxy } from "unpdf";

export const MIN_PDF_TEXT_LENGTH = 200;

export async function extractPdfText(
	buffer: ArrayBuffer,
): Promise<{ text: string; totalPages: number }> {
	const pdf = await getDocumentProxy(new Uint8Array(buffer));
	const { totalPages, text } = await extractText(pdf, { mergePages: true });

	const trimmed = text.trim();

	if (!trimmed) {
		throw new Error(
			"Could not extract any text from the PDF. The file may be scanned or image-only.",
		);
	}

	if (trimmed.length < MIN_PDF_TEXT_LENGTH) {
		throw new Error(
			`Extracted text is too short (${trimmed.length} characters). A valid LinkedIn profile PDF should contain at least ${MIN_PDF_TEXT_LENGTH} characters. The PDF may be incomplete or not a LinkedIn export.`,
		);
	}

	return { text: trimmed, totalPages };
}

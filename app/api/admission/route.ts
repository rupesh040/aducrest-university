import { handleSubmission } from "@/app/lib/submission-handler";

export async function POST(request: Request) {
  return handleSubmission(request, "admission");
}

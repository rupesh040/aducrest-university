import { handleSubmission } from "@/lib/submission-handler";

export async function POST(request: Request) {
  return handleSubmission(request, "contact");
}

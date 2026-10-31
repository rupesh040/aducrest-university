import { content } from "@/app/data";
import { PrimaryButton } from "@/app/components/Primitives";

export default function NotFound() {
  return (
    <section className="min-h-[65vh] grid place-items-center text-center py-8 px-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-heading mb-4">
          {content.ui.notFoundTitle}
        </h1>
        <p className="text-muted text-base leading-relaxed my-4 mb-7">
          {content.ui.notFoundDescription}
        </p>
        <PrimaryButton button={{ label: content.ui.backHome, href: "/" }} />
      </div>
    </section>
  );
}

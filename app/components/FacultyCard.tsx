import { Photo } from "./Primitives";
import type { Faculty } from "@/app/data/types";

export function FacultyCard({ faculty }: { faculty: Faculty }) {
  return (
    <article className="faculty-card lift-card">
      <Photo
        asset={faculty.image}
        sizes="(max-width: 600px) 90vw, (max-width: 1023px) 45vw, 25vw"
      />
      <div>
        <h3>{faculty.name}</h3>
        <span className="tiny-rule" />
        <p>{faculty.role}</p>
        <span className="faculty-department">{faculty.department}</span>
      </div>
    </article>
  );
}

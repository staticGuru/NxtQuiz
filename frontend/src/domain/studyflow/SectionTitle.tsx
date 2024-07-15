import { ArrowIcon } from '@frontend/domain/studyflow/icons/ArrowIcon';

export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-1 rounded-3xl border-2 border-custom-blue-start px-2.5 py-1">
      <h1 className="text-sm font-medium text-custom-blue-start">{title}</h1>
      <ArrowIcon />
    </div>
  );
}

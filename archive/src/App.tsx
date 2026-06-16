import { ArchiveSection } from "./components/ui/archive";
import { archiveEntries, archiveSectionCopy } from "./data/archive";

export default function App() {
  return (
    <ArchiveSection
      eyebrow={archiveSectionCopy.eyebrow}
      title={archiveSectionCopy.title}
      description={archiveSectionCopy.description}
      items={archiveEntries}
    />
  );
}

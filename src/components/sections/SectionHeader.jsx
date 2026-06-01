import SectionTitle from '../ui/SectionTitle';

export default function SectionHeader({ eyebrow, title, description, revealStyles }) {
  return (
    <SectionTitle
      eyebrow={eyebrow}
      title={title}
      description={description}
      eyebrowClassName={revealStyles?.revealEyebrow}
      titleClassName={revealStyles?.revealTitle}
      descriptionClassName={revealStyles?.revealDescription}
    />
  );
}

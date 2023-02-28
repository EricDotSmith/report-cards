import { PropsWithChildren } from "react";

interface SectionCardProps extends PropsWithChildren {
  title: string;
  description: string;
  withPadding?: boolean;
  cardBackground?: string;
  id: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  children,
  id,
}) => {
  return (
    <div id={id} className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">{children}</div>
      </div>
    </div>
  );
};

export default SectionCard;

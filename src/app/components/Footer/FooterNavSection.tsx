import type { NavigationGroup } from "@/app/constants/NavigationStructure";
import FooterNavLink from "./FooterNavLink";

interface FooterNavSectionProps {
  group: NavigationGroup;
}

const FooterNavSection: React.FC<FooterNavSectionProps> = ({ group }) => {
  // Don't render Home as a separate section
  if (group.name === "Home" || group.items.length === 0) {
    return null;
  }

  // For single-item groups that are always visible (like Quiz), render as simple link
  if (group.items.length === 1 && group.alwaysVisible) {
    const item = group.items[0];
    return (
      <div className="flex flex-col space-y-2">
        <FooterNavLink text={item.name} href={item.href} />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-orange-400 font-semibold text-sm uppercase tracking-wide">
        {group.name}
      </h4>
      <div className="flex flex-col space-y-2">
        {group.items.slice(0, 5).map((item) => (
          <FooterNavLink 
            key={item.href} 
            text={item.name} 
            href={item.href} 
          />
        ))}
        {group.items.length > 5 && (
          <FooterNavLink 
            text={`View All ${group.name}`} 
            href={group.name === "Books" ? "/books" : `/${group.name.toLowerCase()}`} 
          />
        )}
      </div>
    </div>
  );
};

export default FooterNavSection;
export interface BaseProps {
  className?: string;
  children: React.ReactNode;
}

export interface BodyItemType extends BaseProps {
  activeId: number;
  index: number;
}

export interface TabsType extends BaseProps {
  activeId: number;
}

export interface SwitcherItemProps extends BaseProps {
  onChange?: () => void;
  index: number;
}

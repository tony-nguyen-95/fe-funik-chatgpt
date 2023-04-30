export interface IDropdownItemProps {
  title: string;
  subMenu?: ISubMenu[];
}

export interface ISubMenu {
  subTitle?: string;
  link?: string;
  isText?: boolean;
  onAciton?: () => void;
}

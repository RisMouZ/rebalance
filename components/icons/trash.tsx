import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function Trash({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </SvgIcon>
  );
}

import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function Plus({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </SvgIcon>
  );
}

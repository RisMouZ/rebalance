import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function Eye({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </SvgIcon>
  );
}

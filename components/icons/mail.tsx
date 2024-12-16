import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function Mail({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </SvgIcon>
  );
}

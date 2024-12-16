import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function CropIcon({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <path d="M6 2v14a2 2 0 0 0 2 2h14" />
      <path d="M18 22V8a2 2 0 0 0-2-2H2" />
    </SvgIcon>
  );
}

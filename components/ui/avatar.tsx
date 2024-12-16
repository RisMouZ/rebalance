"use client";

import { clx } from "@/lib/utils/clx/clx-merge";
import * as AvatarPrimitive from "@/components/primitives/avatar";
import { STYLES } from "@/components/ui/_shared";

//
export const Avatar = clx(
  AvatarPrimitive.Root,
  "relative flex size-10 shrink-0 overflow-hidden rounded-full",
);

export const AvatarImage = clx(AvatarPrimitive.Image, STYLES.SIZE_FULL, "aspect-square");

export const AvatarFallback = clx(
  AvatarPrimitive.Fallback,
  STYLES.FLEX_CENTER_JUSTIFIED,
  STYLES.SIZE_FULL,
  "rounded-full bg-muted",
);

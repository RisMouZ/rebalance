import * as React from "react";

// core
import { Primitive } from "./core-primitive";
import type * as Radix from "./core-primitive";

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                       ASPECT RATIO                         */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

type AspectRatioElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = Radix.ComponentPropsWithoutRef<typeof Primitive.div>;

interface AspectRatioProps extends PrimitiveDivProps {
  ratio?: number;
}

const AspectRatioPrimitive = React.forwardRef<AspectRatioElement, AspectRatioProps>(
  (props, forwardedRef) => {
    const { ratio = 1 / 1, style, ...aspectRatioProps } = props;
    return (
      <div
        style={{
          // ensures inner element is contained
          position: "relative",
          // ensures padding bottom trick maths works
          width: "100%",
          paddingBottom: `${100 / ratio}%`,
        }}
        data-Radix-aspect-ratio-wrapper=""
      >
        <Primitive.div
          {...aspectRatioProps}
          ref={forwardedRef}
          style={{
            ...style,
            // ensures children expand in ratio
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        />
      </div>
    );
  },
);

AspectRatioPrimitive.displayName = "AspectRatioPrimitive";

const Root = AspectRatioPrimitive;

export { AspectRatioPrimitive, Root };
export type { AspectRatioProps };

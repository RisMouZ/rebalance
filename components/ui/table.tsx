import { clx } from "@/lib/utils/clx/clx-merge";

// const TableBody = clx.tbody("[&_tr:last-child]:border-0");
export const TableBody = clx.tbody();
export const TableHeader = clx.thead("[&_tr]:border-b");
export const TableRow = clx.tr(
  "border border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
);
export const TableCell = clx.td("p-4 align-middle [&:has([role=checkbox])]:pr-0");
export const TableHead = clx.th(
  "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
);
export const TableCaption = clx.caption("mt-4 text-sm text-muted-foreground");
export const TableFooter = clx.tfoot(
  "border border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
);

export function Table({ ...props }: React.HTMLAttributes<HTMLTableElement>) {
  const TableRoot = clx.table("w-full caption-bottom text-sm max-w-7xl");

  return (
    <div className="relative w-full overflow-auto">
      <TableRoot {...props} />
    </div>
  );
}

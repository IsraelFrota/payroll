import React from "react";
import clsx from "clsx";

type TableBaseProps = React.ComponentPropsWithoutRef<"table">;

type TableComponent = React.FC<TableBaseProps> & {
  Title: React.FC<TableBaseProps>;
  Header: React.FC<TableBaseProps>;
  Row: React.FC<TableBaseProps>;
  Cell: React.FC<TableBaseProps>;
  Body: React.FC<TableBaseProps>;
};

export const Table: TableComponent = ({ children, className, ...props }) => {
  return (
    <table
      {...props}
      className={clsx("w-full text-xs", className)}
    >
      {children}
    </table>
  );
};

Table.Header = ({ children, className }) => {
  return (
    <thead className={clsx(className)}>
      {children}
    </thead>
  );
};

Table.Title = ({ children, className, ...props }) => {
  return (
    <caption {...props} className={clsx(className)}>
      {children}
    </caption>
  );
};

Table.Row = ({ children, className }) => {
  return (
    <tr className={clsx(className)}>
      {children}
    </tr>
  );
};

Table.Cell = ({ children, className }) => {
  return (
    <td className={clsx("px-3 py-2", className)}>
      {children}
    </td>
  );
};

Table.Body = ({ children, className }) => {
  return (
    <tbody className={clsx(className)}>
      {children}
    </tbody>
  );
};

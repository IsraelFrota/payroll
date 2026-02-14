import React from "react";
import clsx from "clsx";

type CardBaseProps = React.ComponentPropsWithoutRef<"div">;

type CardComponent = React.FC<CardBaseProps> & {
  Title: React.FC<CardBaseProps>;
  Content: React.FC<CardBaseProps>;
  Footer: React.FC<CardBaseProps>;
};

export const Card: CardComponent = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={clsx(
        "w-full max-w-sm rounded-md overflow-hidden border bg-white/40 backdrop-blur-md shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
};

Card.Title = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx(className)}>
      {children}
    </div>
  );
};

Card.Content = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx(className)}>
      {children}
    </div>
  );
};

Card.Footer = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx(className)}>
      {children}
    </div>
  );
};

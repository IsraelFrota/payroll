import React from 'react';
import clsx from 'clsx';

type SeparatorBaseProps = React.ComponentPropsWithoutRef<'div'>;

type SeparatorComponent = React.FC<SeparatorBaseProps>;

export const Separator: SeparatorComponent = ({ className }) => {
  return <div className={clsx('border-b border-gray-300', className)}></div>;
}
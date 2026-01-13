import * as TabsPrimitive from '@radix-ui/react-tabs';

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({
  className,
  ...props
}: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List
    className={`flex border-b border-gray-200 px-1 ${className || ''}`}
    {...props}
  />
);

export const TabsTrigger = ({
  className,
  ...props
}: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={`px-4 py-2 text-slate-500 -mb-px font-semibold hover:text-slate-900 border-b-2 border-transparent tracking-tight data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 ${className}`}
    {...props}
  />
);

export const TabsContent = TabsPrimitive.Content;

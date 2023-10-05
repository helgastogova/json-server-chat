import React, { useState, useContext, createContext, FC, useEffect } from 'react';
import cx from 'classnames';
import { BaseProps, BodyItemType, TabsType, SwitcherItemProps } from './types';
import s from './tabs.module.css';

const TabContext = createContext<{
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const Tabs: FC<TabsType & { activeId: number }> = ({ children, className, activeId }) => {
  const initialActiveTab = activeId ? +activeId : 0;
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {
    const parsedActiveId = activeId ? +activeId : 0;
    setActiveTab(parsedActiveId);
  }, [activeId]);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cx(s.root, className)}>{children}</div>
    </TabContext.Provider>
  );
};

export const Switcher: FC<BaseProps> = ({ children, className }) => {
  return <div className={cx(s.switcher, className)}>{children}</div>;
};

export const SwitcherItem: FC<SwitcherItemProps> = ({ children, index, className, onChange }) => {
  const context = useContext(TabContext);
  if (!context) return null;
  const { activeTab, setActiveTab } = context;

  return (
    <button
      className={cx(s.switcherButton, activeTab === index ? s.active : '', className)}
      onClick={() => {
        setActiveTab(index);
        onChange?.();
      }}
    >
      {children}
    </button>
  );
};

export const Body: FC<BaseProps> = ({ children, className }) => {
  return <div className={cx(s.body, className)}>{children}</div>;
};

export const BodyItem: FC<BodyItemType> = ({ children, index, activeId }) => {
  return activeId === index ? children : null;
};

import React, { FC } from "react";

interface ITab {
	children: React.ReactNode;
}

const Tab: FC<ITab> = ({ children }) => {
	return <div className="chip">{children}</div>;
};

export default Tab;

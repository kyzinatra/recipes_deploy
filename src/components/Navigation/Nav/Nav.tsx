import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Nav = () => {
	const { route } = useRouter();
	return (
		<div>
			{route != "/" && route != "/dishes/[id]" && (
				<>
					<Link href={"/"}>home</Link>
					{route != "/add" && <Link href={"/add"}>add</Link>}
					{route != "/list" && <Link href={"/list"}>list</Link>}
					{route != "/search" && <Link href={"/search"}>search</Link>}
				</>
			)}
		</div>
	);
};

export default Nav;

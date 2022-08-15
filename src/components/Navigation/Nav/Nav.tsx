import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch } from "../../../services";
import { reset } from "../../../services/slices/details";

import style from "./Nav.module.sass";

const Nav = () => {
	const { route } = useRouter();
	return (
		<ul className={style["nav-ul"]}>
			{route != "/" && route != "/dishes/[id]" && (
				<>
					<li>
						<Link href={"/"}>
							<a>
								<i className="material-icons">home</i>
								<span>Home</span>
							</a>
						</Link>
					</li>
					{route != "/add" && (
						<li>
							<Link href={"/add"}>
								<a>
									<i className="material-icons">add</i>
									<span>add</span>
								</a>
							</Link>
						</li>
					)}
					{route != "/list" && (
						<li>
							<Link href={"/list"}>
								<a>
									<i className="material-icons">list</i>
									<span>list</span>
								</a>
							</Link>
						</li>
					)}
					{route != "/search" && (
						<li>
							<Link href={"/search"}>
								<a>
									<i className="material-icons">search</i>
									<span>search</span>
								</a>
							</Link>
						</li>
					)}
				</>
			)}
		</ul>
	);
};

export default Nav;

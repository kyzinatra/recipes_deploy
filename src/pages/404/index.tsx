import React from "react";
import style from "./index.module.sass";
import Image from "next/image";
import Link from "next/link";

const Page404 = () => {
	return (
		<div className={style.content}>
			<Link href="/">
				<a>Перейти к главной странице</a>
			</Link>
			<Image src="/404img.png" alt="" layout="fill" className={style.image} aria-hidden={true} />
		</div>
	);
};

export default Page404;

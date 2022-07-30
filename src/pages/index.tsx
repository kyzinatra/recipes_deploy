import React from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout/Layout";
import { useAppSelector } from "../services";
import { ADD_TOAST } from "../services/slices/toasts";

const Main = () => {
	const dispatch = useDispatch();

	return <Layout></Layout>;
};

export default Main;

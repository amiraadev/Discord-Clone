/** @format */

import { useNavigate, useParams } from "react-router-dom";
import { useProfileStore } from "../../../stores/profileStore";
import { useQuery } from "@apollo/client";
import { GET_SERVERS } from "../../../graphql/queries/GetServers";
import {
	GetServersQuery,
	GetServersQueryVariables,
} from "../../../gql/graphql";

export function useServers() {

	const { data: servers, loading } = useQuery<
		GetServersQuery,
		GetServersQueryVariables
	>(GET_SERVERS);

	return { servers: servers?.getServers, loading };
}

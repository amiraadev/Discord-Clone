import { useNavigate, useParams } from "react-router-dom";
import { useProfileStore } from "../../../stores/profileStore";
import { GET_SERVER } from "../../../graphql/queries/GetServer";

export function useServer(){
    const {serverId} = useParams<{serverId:string}>()
    const profileId = useProfileStore((state)=>state.profile?.id)

    const navigate = useNavigate()

    const {data:dataServer,loading}=useQuery(GET_SERVER)
}
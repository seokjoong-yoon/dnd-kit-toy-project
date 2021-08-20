import LayoutExample from "../../components/LayoutExample";
import { useRouter } from "next/router";

const CatchAllRoutePost = () => {
    const router = useRouter();

    return(
        <LayoutExample>
            <p>This is the result of the router.query.params (array) iteration:</p>
            <p>
                {router.query.params.map((param) => (
                    <span>/{param}</span>
                ))}
            </p>
        </LayoutExample>
    )
}

export default CatchAllRoutePost
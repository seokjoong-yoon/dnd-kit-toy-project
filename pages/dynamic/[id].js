import LayoutExample from "../../components/LayoutExample";
import { useRouter } from "next/router";

const DynamicPost = () => {
    const router = useRouter();

    return (
        <LayoutExample>
            <p>This is the id received from useRouter:</p>
            <p>{router.query.id}</p>
        </LayoutExample>
    )
}

export default DynamicPost
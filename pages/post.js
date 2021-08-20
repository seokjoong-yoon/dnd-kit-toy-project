import LayoutExample from "../components/LayoutExample";
import { useRouter } from "next/router";

const Post = () => {
    const router = useRouter();

    return (
        <LayoutExample>
            <h1>{router.query.title}</h1>
            <p>This is the blog post content.</p>
        </LayoutExample>
    )
}

// https://nextjs.org/docs/api-reference/next/router#userouter for inquiry about useRouter.
// "If you want to access 'router' object inside any function component in your app, you can use
// the 'useRouter' hook." For class components, use 'withRouter'.

export default Post
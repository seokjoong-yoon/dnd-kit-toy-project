import Head from 'next/head'
import LayoutExample from "../../components/LayoutExample";
import axios from "axios";

const blogPage = (props) => {
    return (
        <LayoutExample>
            <Head>
                <title>{props.title}</title>
            </Head>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </LayoutExample>
    )
}

export async function getStaticProps(context) {
    const result = await axios.get(`http://localhost:8000/api/blog/${context.params.id}`)
    const data = result.data
    return { props : {title: data.title, content: data.content} }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: "a1b2c3"} }
        ],
        fallback: false
    }
}

export default blogPage
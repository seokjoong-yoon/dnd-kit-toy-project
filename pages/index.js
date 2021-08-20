import LayoutExample from "../components/LayoutExample";
import Link from 'next/link'
import styles from './index.module.css'

const PostLink = (props) => (
    <li>
        <Link href={`/post?title=${props.title}`}>
            <p>{props.title}</p>
        </Link>
    </li>
)
// passes querystring to post.js

const DynamicRoute = (props) => (
    <li>
        <Link href={`/dynamic/${props.id}`}>
            <p>Goes to /dynamic/:id <span>({props.id})</span></p>
        </Link>
    </li>
)

const CatchAllRoute = (props) => (
    <li>
        <Link href={`/dynamic/${props.name}/${props.id}`}>
            <p>Goes to /dynamic/:name/:id <span>({props.name} + {props.id})</span></p>
        </Link>
    </li>
)

const BlogRoute = (props) => (
    <li>
        <Link href={`/blog/${props.id}`}>
            <p>Goes to /blog/:id <span>({props.id})</span></p>
        </Link>
    </li>
)


const Index = () => (
    <LayoutExample>
        <h1>Personal Blog</h1>
        <ul>
            <PostLink title="hello, Next.js" />
            <PostLink title="Learn Next.js is awesome!" />
            <PostLink title="deploy Next.js with Zeit" />
        </ul>
        <div className={styles.space}></div>
        <h3>Dynamic Routing Examples</h3>
        <ul>
            <DynamicRoute id="123" />
            <DynamicRoute id="abcde" />
            <CatchAllRoute name="seoul" id='567' />
        </ul>
        <h3>Pre-Rendering using getStaticProps()</h3>
        <ul>
            <BlogRoute id="a1b2c3" />
        </ul>
    </LayoutExample>
)

// Link provides browser history routing. Back button works without any additional code.
// Link is a wrapper component, thus style should be applied directly to its children.
// Every tags can be wrapped in Link if it can receive onClick prop.
// Next.js is all about pages. We can create the page by making react component in "pages" dir and exporting it.
// Then, by the file name, URL is fixed.

// The router will automatically route files named 'index' to the root of the directory.

export default Index
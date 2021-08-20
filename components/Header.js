import Link from 'next/link'

const linkStyle = {
    marginRight: 10
}

const Header = () => (
    <div>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
            <a style={linkStyle}>About</a>
        </Link>
    </div>
)

export default Header

// directory name doesn't have to be "component" but can be sth else.
// Header component does not require for fixed url, so we separate it to another directory.
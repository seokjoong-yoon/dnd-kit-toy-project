import Header from './Header'
import styles from './LayoutExample.module.css'

const LayoutExample = (props) => (
    <div className={styles.layoutExample}>
        <Header />
        {props.children}
    </div>
)

export default LayoutExample

// component-level stylesheet should be named as [filename].module.css to be imported normally.
// Note how the 'layoutExample' is accessed as a property on the imported 'styles' object.
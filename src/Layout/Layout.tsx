import  style  from './layout.module.css';
import { childrenProps } from '../Types/Types';

function Layout({ children }: childrenProps) {
    return (
        <div className={ style.layout }>
            { children }
        </div>
    )
}

export default Layout;
export {default as NavElement} from './NavElement'
export { default as NavButton } from './NavButton'
// Props for navbar. text and optional function
export interface NavProps {
    text: string;
    onClick?: () => void;
}

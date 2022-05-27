export default function Heading({ children, type }) {
  return type ? <h1>{children}</h1> : <h2>{children}</h2>;
}

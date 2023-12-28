// import Header from './header'
import Header from "@/components/header";

export default function Layout({ children }) {
  return (
    <>
      <Header title='MelFront!' number="2" />
      <main>{children}</main>
    </>
  )
}
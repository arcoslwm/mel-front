// import Header from './header'
import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title='MelFront!' />
      <main>{children}</main>
    </>
  )
}
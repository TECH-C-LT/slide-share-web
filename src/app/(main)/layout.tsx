import BreadcrumbNav from '@/components/common/breadcrumb-nav'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-dvh overflow-hidden">
      <BreadcrumbNav />
      <ScrollArea className="h-dvh px-4">
        <span className="pt-16 pb-5 block"></span>
        {children}
      </ScrollArea>
    </main>
  )
}

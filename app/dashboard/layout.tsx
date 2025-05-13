import SideNav from '@/app/ui/dashboard/sidenav';
import '@/app/globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="grid grid-cols-6 gap-2 max-w-screen-xl w-full h-full min-h-[75vh]">
        <SideNav />
        {children}
      </div>
    </main>
  );
}

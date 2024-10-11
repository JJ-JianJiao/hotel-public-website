import SideNavigation from "../_components/SideNavigation";

export default function AccountLayout({ children }) {
  return (
    <>
      <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
        <SideNavigation />
        <div>{children}</div>
      </div>
    </>
  );
}
